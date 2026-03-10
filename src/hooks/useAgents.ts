import { useQuery } from "@tanstack/react-query";
import { fetchAgents } from "~/lib/nostr";
import { useNetwork } from "~/hooks/useNetwork";
import type { Agent } from "~/types";

export function useAgents() {
  const { network } = useNetwork();
  return useQuery<Agent[]>({
    queryKey: ["agents", network],
    queryFn: () => fetchAgents(network),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
