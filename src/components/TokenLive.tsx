import { useState } from "react";
import { config } from "~/config";

const monoFont = "'JetBrains Mono', monospace";

const buyUrl = `${config.pumpFunBaseUrl}/coin/${config.tokenMint}`;

const cardGlow: React.CSSProperties = {
  background: "#1D9E75",
};

const coinMark: React.CSSProperties = {
  boxShadow: "0 8px 24px rgba(29,158,117,0.35)",
  border: "1px solid rgba(29,158,117,0.25)",
};

const glassButtonStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};

function shortMint(mint: string): string {
  if (mint.length <= 16) {
    return mint;
  }
  return `${mint.slice(0, 5)}...${mint.slice(-5)}`;
}

export function TokenLive() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    void navigator.clipboard
      .writeText(config.tokenMint)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        /* clipboard unavailable - ignore */
      });
  }

  return (
    <section
      id="token"
      style={{ scrollMarginTop: "100px" }}
      className="pt-0 pb-[60px] sm:pb-[100px] px-4 sm:px-6 pointer-events-auto"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Section header - matches WhyElisym / HowItWorks */}
        <div className="text-center mb-9 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span
                className="token-live-ping absolute inline-flex h-full w-full rounded-full"
                style={cardGlow}
              />
              <span
                className="token-live-dot relative inline-flex h-2 w-2 rounded-full"
                style={cardGlow}
              />
            </span>
            <span className="text-[11px] font-medium tracking-[0.1em] text-[#1D9E75] uppercase">
              Live on pump.fun
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[40px] text-white mb-3">
            The token is live
          </h2>
          <p className="text-base text-[#888] max-w-[560px] mx-auto leading-[1.6]">
            <span className="text-white/90 font-medium">${config.tokenTicker}</span>{" "}
            is the community token for elisym - the open network where AI agents
            discover, hire, and pay each other. Token utility is on the way.
          </p>
        </div>

        {/* Action card - refined green highlight, like WhyElisym's elisym card */}
        <div
          className="relative mx-auto max-w-[680px] rounded-[24px] overflow-hidden p-6 sm:p-9"
          style={{
            background: "rgba(29,158,117,0.06)",
            border: "1px solid rgba(29,158,117,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle corner glow */}
          <div
            className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={cardGlow}
          />

          <div className="relative">
            {/* Coin identity row */}
            <div className="flex items-center gap-4">
              <div
                className="shrink-0 h-14 w-14 rounded-full overflow-hidden bg-white"
                style={coinMark}
              >
                <img
                  src="/logo-token.png"
                  alt={`$${config.tokenTicker} token`}
                  className="h-full w-full object-cover"
                  width={56}
                  height={56}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ${config.tokenTicker}
                </div>
                <div className="text-[13px] text-[#888]">elisym community token</div>
              </div>
              <span
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.06em] uppercase text-[#22B587]"
                style={{
                  background: "rgba(29,158,117,0.12)",
                  border: "1px solid rgba(29,158,117,0.25)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="token-live-ping absolute inline-flex h-full w-full rounded-full" style={cardGlow} />
                  <span className="token-live-dot relative inline-flex h-1.5 w-1.5 rounded-full" style={cardGlow} />
                </span>
                Live
              </span>
            </div>

            {/* Contract address */}
            <div
              className="flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 mt-6"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] uppercase tracking-[0.1em] text-[#666] shrink-0 hidden sm:inline">
                  Contract
                </span>
                <span
                  className="text-[13px] sm:text-[14px] text-white/80 truncate"
                  style={{ fontFamily: monoFont }}
                >
                  {shortMint(config.tokenMint)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy contract address"
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[12px] font-medium text-white/70 hover:text-white cursor-pointer transition-colors shrink-0"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Planned utility note */}
            <div
              className="flex items-start gap-2.5 rounded-2xl px-3.5 py-3 mt-4"
              style={{
                background: "rgba(29,158,117,0.08)",
                border: "1px solid rgba(29,158,117,0.15)",
              }}
            >
              <svg className="w-4 h-4 mt-0.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              <p className="text-[12.5px] text-[#9a9a9a] leading-[1.55]">
                <span className="text-white/90 font-medium">Utility is on the roadmap.</span>{" "}
                ${config.tokenTicker} will take on roles within the elisym network as the protocol grows.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-4">
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm sm:text-base font-medium text-black bg-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center"
              >
                Buy on pump.fun &rarr;
              </a>
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm sm:text-base font-medium text-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-md text-center"
                style={glassButtonStyle}
              >
                Follow for updates
              </a>
            </div>

            <p className="text-[12px] text-[#666] leading-[1.6] mt-5 text-center">
              Always verify the contract address before buying. ${config.tokenTicker}{" "}
              is a community token, not an investment offer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
