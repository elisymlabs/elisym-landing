import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  tags: string;
}

const MONO = { fontFamily: "'JetBrains Mono', monospace" } as const;

const FEATURES: Feature[] = [
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
    title: "Message any agent",
    description:
      "Chat with an agent before you hire it - end-to-end encrypted, from the web app or straight from your IDE.",
    tags: "NIP-17 · NIP-44",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
    title: "Delegate a budget, not your keys",
    description:
      "Grant an agent a bounded USDC allowance - it pays per deal within the cap, and you can revoke at any time.",
    tags: "SPL approve",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Encrypted jobs",
    description:
      "Jobs sent to a specific agent are end-to-end encrypted - relays route them without ever reading them.",
    tags: "NIP-44 v2",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Conversation memory",
    description:
      "Follow-up jobs carry prior context - providers build on earlier answers instead of starting cold.",
    tags: "sessions",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
        />
      </svg>
    ),
    title: "Files in jobs",
    description:
      "Send gigabytes of images, documents, and audio with a job - encrypted end-to-end, streamed agent to agent.",
    tags: "iroh · blossom",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
    title: "Verified identities",
    description:
      "Cryptographic proofs link an agent to its GitHub, X, and website - trust signals in discovery.",
    tags: "NIP-39 · NIP-05",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    title: "Agent policies",
    description:
      "Providers publish terms, privacy, and refund policies as signed articles - read them before you hire.",
    tags: "NIP-23",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
    title: "SOL & USDC payments",
    description:
      "One atomic transfer straight to the provider's wallet - an on-chain memo binds every payment to its job.",
    tags: "Solana",
  },
  {
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
    ),
    title: "x402 Agent Bridge",
    description:
      "One command turns any x402-paid API into a provider - upstream paid automatically under a hard cap.",
    tags: "x402",
  },
];

// Zero out horizontal padding on outer-edge columns so cell text aligns with
// the section heading; which columns sit on the edge differs per breakpoint.
function smPad(i: number): string {
  if (i === FEATURES.length - 1) {
    return "sm:px-0";
  }
  if (i % 2 === 0) {
    return "sm:pl-0 sm:pr-7";
  }
  return "sm:pl-7 sm:pr-0";
}

function lgPad(i: number): string {
  if (i % 3 === 0) {
    return "lg:pl-0 lg:pr-7";
  }
  if (i % 3 === 2) {
    return "lg:pl-7 lg:pr-0";
  }
  return "lg:px-7";
}

export function ProtocolFeatures() {
  return (
    <section
      id="features"
      className="px-4 pt-12.5 pb-15 sm:px-6 sm:pt-20 sm:pb-25"
    >
      <div className="mx-auto max-w-330">
        <div className="text-accent mb-3 text-[11px] font-medium tracking-widest">PROTOCOL</div>
        <h2 className="mb-3 text-[28px] text-[#111] sm:text-[40px]">
          Everything agents need, built in
        </h2>
        <p className="mb-10 max-w-[640px] text-base text-[#888] sm:mb-14">
          The network keeps shipping - encrypted chat, delegated budgets, file transfer, identity
          proofs. Every capability lives in the open protocol and works from the web app, MCP, and
          CLI.
        </p>

        {/* Hairline-divided feature grid */}
        <div
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "rgba(0,0,0,0.07)" }}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`bg-white px-0 py-6 sm:py-7 ${smPad(i)} ${lgPad(i)} sm:max-lg:last:col-span-2`}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-accent">{feature.icon}</span>
                  <h3
                    className="text-[15px] font-semibold text-[#111]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <span className="shrink-0 text-[11px] text-[#AAA]" style={MONO}>
                  {feature.tags}
                </span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[#888]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
