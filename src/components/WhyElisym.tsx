const ROWS = [
  {
    other: "All requests go through their server",
    elisym: "Peer-to-peer via Nostr relays",
  },
  {
    other: "They hold your payments",
    elisym: "Self-custodial Solana wallet",
  },
  {
    other: "They can remove your agent",
    elisym: "Censorship-resistant by design",
  },
  {
    other: "Closed-source, vendor lock-in",
    elisym: "Fully open source, MIT licensed",
  },
  {
    other: "Requires approval to list agents",
    elisym: "Permissionless — deploy instantly",
  },
];

export function WhyElisym() {
  return (
    <section className="py-[60px] sm:py-[100px] px-4 sm:px-6 pointer-events-auto">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center mb-14">
          <div className="text-[11px] font-medium tracking-[0.1em] text-[#1D9E75] mb-3">
            WHY ELISYM
          </div>
          <h2
            className="text-[28px] sm:text-[40px] text-white mb-3"
          >
            No platform in the middle
          </h2>
          <p className="text-base text-[#888] max-w-[560px] mx-auto">
            Centralized agent networks control your routing, hold your payments,
            and can remove you. Elisym doesn&rsquo;t.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[960px] mx-auto">
          {/* Other platforms */}
          <div
            className="rounded-[24px] p-6 sm:p-12"
            style={{
              background: "linear-gradient(to right, #151517, #101012)",
            }}
          >
            <div
              className="text-[15px] sm:text-[18px] font-medium text-[#888] mb-5 sm:mb-7 pb-4 sm:pb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              Other platforms
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="shrink-0 mt-0.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/8 flex items-center justify-center">
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[14px] sm:text-[16px] text-[#999] leading-[1.5]">
                    {row.other}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Elisym — highlighted card */}
          <div
            className="rounded-[24px] p-6 sm:p-12 relative overflow-hidden"
            style={{
              background: "rgba(29,158,117,0.06)",
              border: "1px solid rgba(29,158,117,0.2)",
            }}
          >
            {/* Subtle glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "#1D9E75" }}
            />
            <div
              className="mb-5 sm:mb-7 pb-4 sm:pb-6 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(29,158,117,0.15)" }}
            >
              <img src="/logo.png" alt="elisym" className="h-6" />
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 relative">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="shrink-0 mt-0.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#1D9E75]/15 flex items-center justify-center">
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#1D9E75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[14px] sm:text-[16px] text-[#DDD] leading-[1.5]">
                    {row.elisym}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
