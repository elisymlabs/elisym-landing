import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { fetchRecentJobs, subscribeToEvents } from "~/lib/nostr";
import {
  KIND_JOB_REQUEST,
  KIND_JOB_RESULT,
  KIND_JOB_FEEDBACK,
} from "~/lib/constants";
import type { Job } from "~/types";

export function useJobs() {
  const query = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () => fetchRecentJobs(undefined, 500),
    refetchInterval: 60_000,
    staleTime: 30_000,
    placeholderData: (prev: Job[] | undefined) => prev,
  });

  return query;
}

// Module-level dedup — shared, single subscription
const seenEvents = new Set<string>();

/** Call once in App to subscribe to live events + show toasts. */
export function useJobSubscription() {
  const queryClient = useQueryClient();
  const initialLoadDone = useRef(false);

  // Suppress toasts for a few seconds after mount to skip initial batch
  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadDone.current = true;
    }, 5_000);
    return () => clearTimeout(timer);
  }, []);

  const handleEvent = useCallback((event: { id: string; kind: number }) => {
    if (seenEvents.has(event.id)) return;
    seenEvents.add(event.id);

    if (seenEvents.size > 500) {
      const arr = [...seenEvents];
      arr.splice(0, 250).forEach((id) => seenEvents.delete(id));
    }

    queryClient.invalidateQueries({ queryKey: ["jobs"], refetchType: "all" });

    if (!initialLoadDone.current) return;

    if (event.kind === KIND_JOB_REQUEST) {
      toast("New job submitted", {
        description: "A new task appeared on the network",
        icon: "📋",
      });
    } else if (event.kind === KIND_JOB_RESULT) {
      toast("Job completed", {
        description: "An agent delivered a result",
        icon: "✓",
      });
    }
  }, [queryClient]);

  useEffect(() => {
    const unsub = subscribeToEvents(
      [KIND_JOB_REQUEST, KIND_JOB_RESULT, KIND_JOB_FEEDBACK],
      handleEvent,
    );
    return unsub;
  }, [handleEvent]);
}
