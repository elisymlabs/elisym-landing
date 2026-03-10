import { useJobs } from "~/hooks/useJobs";
import { truncateKey, timeAgo, formatSol, statusColor } from "~/lib/format";
import { makeNjumpUrl } from "~/lib/nostr";

export function JobFeed() {
  const { data: jobs, isLoading, error } = useJobs();

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
                className="h-11 animate-pulse border-b border-gray-100 bg-white"
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
              <a
                key={job.eventId}
                href={makeNjumpUrl(job.eventId)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 ${
                  i !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <span className="w-16 shrink-0 text-xs text-gray-400">
                  {timeAgo(job.createdAt)}
                </span>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor(job.status)}`}
                  >
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-700 truncate">
                    <span className="font-mono text-gray-400">
                      {truncateKey(job.customer)}
                    </span>
                    {job.capability && (
                      <>
                        {" "}
                        <span className="text-gray-400">&middot;</span>{" "}
                        <span className="text-gray-600">{job.capability}</span>
                      </>
                    )}
                    {job.amount != null && job.amount > 0 && (
                      <>
                        {" "}
                        <span className="text-gray-400">&middot;</span>{" "}
                        <span className="font-medium text-gray-900">
                          {formatSol(job.amount)}
                        </span>
                      </>
                    )}
                  </span>
                </div>

                <span className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-500">
                  &#8599;
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
