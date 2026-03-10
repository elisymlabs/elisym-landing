import { createContext, useContext, useRef, type ReactNode } from "react";
import { SimplePool } from "nostr-tools";

const NostrPoolContext = createContext<SimplePool | null>(null);

export function NostrPoolProvider({ children }: { children: ReactNode }) {
  const poolRef = useRef<SimplePool>(new SimplePool());
  return (
    <NostrPoolContext.Provider value={poolRef.current}>
      {children}
    </NostrPoolContext.Provider>
  );
}

export function useNostrPool(): SimplePool {
  const pool = useContext(NostrPoolContext);
  if (!pool) throw new Error("useNostrPool must be used within NostrPoolProvider");
  return pool;
}
