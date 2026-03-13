export interface StoredJob {
  jobEventId: string;
  agentPubkey: string;
  agentName: string;
  agentPicture?: string;
  capability: string;
  input: string;
  status: "pending" | "paid" | "completed" | "error";
  result?: string;
  resultEventId?: string;
  txSignature?: string;
  paymentAmount?: number;
  createdAt: number;
  completedAt?: number;
}

function storageKey(wallet: string): string {
  return `elisym:jobs:${wallet}`;
}

// Simple pub/sub so all useJobHistory instances stay in sync
type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function notify() {
  for (const fn of listeners) fn();
}

export function loadJobs(wallet: string): StoredJob[] {
  try {
    const raw = localStorage.getItem(storageKey(wallet));
    if (!raw) return [];
    return JSON.parse(raw) as StoredJob[];
  } catch {
    return [];
  }
}

export function saveJob(wallet: string, job: StoredJob): void {
  const jobs = loadJobs(wallet);
  const idx = jobs.findIndex((j) => j.jobEventId === job.jobEventId);
  if (idx >= 0) {
    jobs[idx] = job;
  } else {
    jobs.unshift(job);
  }
  localStorage.setItem(storageKey(wallet), JSON.stringify(jobs));
  notify();
}

export function updateJob(
  wallet: string,
  jobEventId: string,
  patch: Partial<StoredJob>,
): StoredJob | null {
  const jobs = loadJobs(wallet);
  const idx = jobs.findIndex((j) => j.jobEventId === jobEventId);
  if (idx < 0) return null;
  jobs[idx] = { ...jobs[idx], ...patch };
  localStorage.setItem(storageKey(wallet), JSON.stringify(jobs));
  notify();
  return jobs[idx];
}

export function removeJob(wallet: string, jobEventId: string): void {
  const jobs = loadJobs(wallet).filter((j) => j.jobEventId !== jobEventId);
  localStorage.setItem(storageKey(wallet), JSON.stringify(jobs));
  notify();
}
