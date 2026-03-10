import { createContext, useContext, useState, type ReactNode } from "react";

export type Network = "mainnet" | "devnet";

interface NetworkCtx {
  network: Network;
  setNetwork: (n: Network) => void;
}

const NetworkContext = createContext<NetworkCtx | null>(null);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<Network>("devnet");

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork(): NetworkCtx {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetwork must be used within NetworkProvider");
  return ctx;
}
