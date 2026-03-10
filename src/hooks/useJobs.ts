import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { fetchRecentJobs, subscribeToEvents } from "~/lib/nostr";
import { useNetwork } from "~/hooks/useNetwork";
import {
  KIND_JOB_REQUEST,
  KIND_JOB_RESULT,
  KIND_JOB_FEEDBACK,
} from "~/lib/constants";
import type { Job } from "~/types";

export function useJobs() {
  const { network } = useNetwork();

  const query = useQuery<Job[]>({
    queryKey: ["jobs", network],
    queryFn: () => fetchRecentJobs(network, 50),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const refetchRef = useRef(query.refetch);
  refetchRef.current = query.refetch;

  const handleEvent = useCallback(() => {
    refetchRef.current();
  }, []);

  useEffect(() => {
    const unsub = subscribeToEvents(
      [KIND_JOB_REQUEST, KIND_JOB_RESULT, KIND_JOB_FEEDBACK],
      handleEvent,
    );
    return unsub;
  }, [handleEvent]);

  return query;
}
