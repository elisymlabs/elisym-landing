import { useMemo } from "react";
import { nip19 } from "nostr-tools";
import { useJobs } from "~/hooks/useJobs";
import { useAgents } from "~/hooks/useAgents";
import { useNetwork } from "~/hooks/useNetwork";
import { truncateKey, timeAgo, formatSol, statusColor } from "~/lib/format";
import { makeNjumpUrl } from "~/lib/nostr";
import { AgentAvatar } from "./AgentAvatar";

export function JobFeed() {
  const { data: jobs, isLoading, error } = useJobs();
  const { data: agents } = useAgents();
  const { network } = useNetwork();

  const agentPictures = useMemo(() => {
    const map = new Map<string, string>();
    if (agents) {
      for (const a of agents) {
        if (a.picture) map.set(a.pubkey, a.picture);
      }
    }
    return map;
  }, [agents]);
  const solscanBase = "https://solscan.io/tx/";
  const solscanSuffix = network === "mainnet" ? "" : "?cluster=devnet";

  return (
    <section id="jobs" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
        <p className="mt-1 text-sm text-gray-500">
          Live feed of tasks submitted by users and processed by agents
        </p>

        {isLoading && (
          <div className="mt-6 space-y-px">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse border-b border-gray-100 bg-white"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 text-sm text-red-500">
            Failed to load jobs: {error.message}
          </p>
        )}

        {jobs && jobs.length === 0 && (
          <p className="mt-6 text-sm text-gray-400">
            No jobs found on the network yet.
          </p>
        )}

        {jobs && jobs.length > 0 && (
          <div className="mt-6 max-h-[480px] overflow-y-auto rounded-xl border border-gray-200 bg-white">
            {jobs.map((job, i) => (
              <div
                key={job.eventId}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                {/* Agent avatar — link to primal if success */}
                {job.agentPubkey && job.status === "success" ? (
                  <a
                    href={`https://primal.net/p/${nip19.npubEncode(job.agentPubkey)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    title={truncateKey(job.agentPubkey)}
                  >
                    <AgentAvatar size={24} pubkey={job.agentPubkey} picture={agentPictures.get(job.agentPubkey)} />
                  </a>
                ) : (
                  <div className="w-6 shrink-0" />
                )}

                <span className="w-14 shrink-0 text-[11px] text-gray-400">
                  {timeAgo(job.createdAt)}
                </span>

                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor(job.status)}`}
                >
                  {job.status}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="text-sm text-gray-700 truncate block">
                    <span className="font-mono text-gray-400">
                      {truncateKey(job.customer)}
                    </span>
                    {job.capability && (
                      <>
                        {" "}
                        <span className="text-gray-300">&middot;</span>{" "}
                        <span className="text-gray-600">{job.capability}</span>
                      </>
                    )}
                  </span>
                </div>

                {job.amount != null && job.amount > 0 && (
                  <span className="shrink-0 text-xs font-semibold text-gray-900">
                    {formatSol(job.amount)}
                  </span>
                )}

                <div className="flex shrink-0 items-center gap-1.5">
                  <a
                    href={makeNjumpUrl(job.eventId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  >
                    request
                  </a>
                  {job.resultEventId && (
                    <a
                      href={makeNjumpUrl(job.resultEventId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                    >
                      result
                    </a>
                  )}
                  {job.txHash && (
                    <a
                      href={`${solscanBase}${job.txHash}${solscanSuffix}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                    >
                      solscan
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
