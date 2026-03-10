import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { fetchAgents } from "~/lib/nostr";
import { useNetwork } from "~/hooks/useNetwork";
import type { Agent } from "~/types";

export function useAgents() {
  const { network } = useNetwork();

  const query = useQuery<Agent[]>({
    queryKey: ["agents", network],
    queryFn: () => fetchAgents(network),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  return query;
}

// Module-level to ensure single toast across all hook instances
let prevAgentCount: number | null = null;

/** Call once in App to watch for new agents + show toasts. */
export function useAgentNotifications() {
  const { network } = useNetwork();
  const queryClient = useQueryClient();
  const networkRef = useRef(network);

  // Reset count when network changes
  useEffect(() => {
    if (networkRef.current !== network) {
      prevAgentCount = null;
      networkRef.current = network;
    }
  }, [network]);

  useEffect(() => {
    const unsub = queryClient.getQueryCache().subscribe(() => {
      const state = queryClient.getQueryState<Agent[]>(["agents", networkRef.current]);
      if (!state?.data) return;

      const count = state.data.length;
      if (prevAgentCount !== null && count > prevAgentCount) {
        const diff = count - prevAgentCount;
        toast(`New agent${diff > 1 ? "s" : ""} discovered`, {
          description: `${diff} agent${diff > 1 ? "s" : ""} joined the network`,
          icon: "🤖",
        });
      }
      prevAgentCount = count;
    });
    return unsub;
  }, [queryClient]);
}
