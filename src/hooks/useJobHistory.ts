import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { getPool } from "~/lib/nostr";
import { RELAYS, KIND_JOB_RESULT } from "~/lib/constants";
import {
  loadJobs,
  saveJob as persistJob,
  updateJob as patchJob,
  removeJob as dropJob,
  subscribe as subscribeToChanges,
  type StoredJob,
} from "~/lib/jobHistory";
import type { Filter } from "nostr-tools";

export function useJobHistory() {
  const { publicKey } = useWallet();
  const wallet = publicKey?.toBase58() ?? "";
  const [jobs, setJobs] = useState<StoredJob[]>([]);
  const subsRef = useRef<{ close: () => void }[]>([]);

  // Load from localStorage when wallet changes
  useEffect(() => {
    if (!wallet) {
      setJobs([]);
      return;
    }
    setJobs(loadJobs(wallet));
  }, [wallet]);

  // Re-read from localStorage whenever any instance writes
  useEffect(() => {
    if (!wallet) return;
    return subscribeToChanges(() => {
      setJobs(loadJobs(wallet));
    });
  }, [wallet]);

  // Stable key for pending job IDs — only resubscribe when the set changes
  const pendingKey = useMemo(
    () =>
      jobs
        .filter((j) => j.status === "pending" || j.status === "paid")
        .map((j) => j.jobEventId)
        .sort()
        .join(","),
    [jobs],
  );

  // Subscribe to results for pending/paid jobs
  useEffect(() => {
    if (!wallet || !pendingKey) return;

    // Cleanup previous subs
    for (const sub of subsRef.current) sub.close();
    subsRef.current = [];

    const pending = jobs.filter(
      (j) => j.status === "pending" || j.status === "paid",
    );
    if (pending.length === 0) return;

    const pool = getPool();
    const jobIds = pending.map((j) => j.jobEventId);

    const sub = pool.subscribeMany(
      RELAYS,
      {
        kinds: [KIND_JOB_RESULT],
        "#e": jobIds,
      } satisfies Filter,
      {
        onevent(ev) {
          const eTag = ev.tags.find((t) => t[0] === "e");
          const matchedId = eTag?.[1];
          if (!matchedId) return;

          const job = pending.find((j) => j.jobEventId === matchedId);
          if (!job) return;
          if (job.agentPubkey && ev.pubkey !== job.agentPubkey) return;

          const updated = patchJob(wallet, matchedId, {
            status: "completed",
            result: ev.content,
            completedAt: ev.created_at,
          });

          if (updated) {
            toast.success(`Result received: ${job.agentName}`, {
              description: job.capability,
            });
          }
        },
      },
    );
    subsRef.current.push(sub);

    return () => {
      for (const s of subsRef.current) s.close();
      subsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, pendingKey]);

  const saveJob = useCallback(
    (job: StoredJob) => {
      if (!wallet) return;
      persistJob(wallet, job);
    },
    [wallet],
  );

  const updateJob = useCallback(
    (jobEventId: string, patch: Partial<StoredJob>) => {
      if (!wallet) return;
      patchJob(wallet, jobEventId, patch);
    },
    [wallet],
  );

  const removeJob = useCallback(
    (jobEventId: string) => {
      if (!wallet) return;
      dropJob(wallet, jobEventId);
    },
    [wallet],
  );

  return { jobs, saveJob, updateJob, removeJob };
}
