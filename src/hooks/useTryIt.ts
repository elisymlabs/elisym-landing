import { useState, useCallback, useRef } from "react";
import { generateSecretKey, getPublicKey, finalizeEvent } from "nostr-tools";
import type { Filter } from "nostr-tools";
import { getPool } from "~/lib/nostr";
import { RELAYS, KIND_JOB_REQUEST, KIND_JOB_RESULT, KIND_JOB_FEEDBACK } from "~/lib/constants";

type TryItState = "idle" | "submitting" | "waiting" | "success" | "error";
type FeedbackState = "idle" | "sending" | "sent";

export function useTryIt() {
  const [state, setState] = useState<TryItState>("idle");
  const [result, setResult] = useState<string>("");
  const [agentPubkey, setAgentPubkey] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const skRef = useRef<Uint8Array | null>(null);
  const jobEventIdRef = useRef<string>("");

  const submit = useCallback(async (input: string, capability: string) => {
    setState("submitting");
    setResult("");
    setError("");

    try {
      const sk = generateSecretKey();
      skRef.current = sk;
      const pk = getPublicKey(sk);
      const pool = getPool();

      const event = finalizeEvent(
        {
          kind: KIND_JOB_REQUEST,
          created_at: Math.floor(Date.now() / 1000),
          tags: [
            ["i", input, "text"],
            ["t", capability],
            ["t", "elisym"],
            ["output", "text/plain"],
          ],
          content: "",
        },
        sk,
      );

      await Promise.any(pool.publish(RELAYS, event));
      jobEventIdRef.current = event.id;
      setState("waiting");

      const sub = pool.subscribeMany(
        RELAYS,
        {
          kinds: [KIND_JOB_RESULT],
          "#e": [event.id],
          since: event.created_at,
        } satisfies Filter,
        {
          onevent(resultEvent) {
            if (resultEvent.tags.some((t) => t[0] === "e" && t[1] === event.id)) {
              setResult(resultEvent.content);
              setAgentPubkey(resultEvent.pubkey);
              setState("success");
              sub.close();
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
          },
        },
      );

      const sub2 = pool.subscribeMany(
        RELAYS,
        {
          kinds: [KIND_JOB_RESULT],
          "#p": [pk],
          since: event.created_at,
        } satisfies Filter,
        {
          onevent(resultEvent) {
            setResult(resultEvent.content);
            setAgentPubkey(resultEvent.pubkey);
            setState("success");
            sub.close();
            sub2.close();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          },
        },
      );

      timeoutRef.current = setTimeout(() => {
        sub.close();
        sub2.close();
        setState("error");
        setError("Timed out waiting for result (60s). No agents may be online.");
      }, 60_000);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Failed to submit job");
    }
  }, []);

  const sendFeedback = useCallback(async (positive: boolean) => {
    if (!skRef.current || !jobEventIdRef.current || !agentPubkey) return;
    setFeedbackState("sending");
    try {
      const pool = getPool();
      const feedbackEvent = finalizeEvent(
        {
          kind: KIND_JOB_FEEDBACK,
          created_at: Math.floor(Date.now() / 1000),
          tags: [
            ["e", jobEventIdRef.current],
            ["p", agentPubkey],
            ["status", "success"],
            ["rating", positive ? "1" : "0"],
            ["t", "elisym"],
          ],
          content: positive ? "Good result" : "Poor result",
        },
        skRef.current,
      );
      await Promise.any(pool.publish(RELAYS, feedbackEvent));
      setFeedbackState("sent");
    } catch {
      setFeedbackState("idle");
    }
  }, [agentPubkey]);

  const reset = useCallback(() => {
    setState("idle");
    setResult("");
    setError("");
    setAgentPubkey("");
    setFeedbackState("idle");
    skRef.current = null;
    jobEventIdRef.current = "";
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { state, result, error, agentPubkey, feedbackState, submit, reset, sendFeedback };
}
