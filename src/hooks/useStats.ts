import { useMemo } from "react";
import { useAgents } from "./useAgents";
import { useJobs } from "./useJobs";
import type { NetworkStats } from "~/types";

export function useStats(): {
  data: NetworkStats | undefined;
  isLoading: boolean;
} {
  const agents = useAgents();
  const jobs = useJobs();

  const data = useMemo(() => {
    if (!agents.data || !jobs.data) return undefined;

    const totalLamports = jobs.data.reduce(
      (sum, j) => sum + (j.amount ?? 0),
      0,
    );
    const completedJobs = jobs.data.filter((j) => j.status === "success");
    return {
      agentCount: agents.data.length,
      jobCount: completedJobs.length,
      totalLamports,
    };
  }, [agents.data, jobs.data]);

  return {
    data,
    isLoading: agents.isLoading || jobs.isLoading,
  };
}
