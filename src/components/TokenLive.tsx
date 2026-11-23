import type { CSSProperties } from "react";
import { useState } from "react";
import { config } from "~/config";

const MONO = { fontFamily: "'JetBrains Mono', monospace" } as const;
const INTER = { fontFamily: "'Inter', sans-serif" } as const;

const buyUrl = `${config.pumpFunBaseUrl}/coin/${config.tokenMint}`;

const dot: CSSProperties = { background: "#1D9E75" };

const glassButtonStyle: CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};

const FACTS: { label: string; value: string }[] = [
  { label: "Network", value: "Solana" },
  { label: "Launch", value: "Fair launch" },
  { label: "Presale", value: "None" },
];

function shortMint(mint: string): string {
  if (mint.length <= 16) {
    return mint;
  }
  return `${mint.slice(0, 6)}...${mint.slice(-6)}`;
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
      style={{
        scrollMarginTop: "100px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      className="py-15 sm:py-25 px-4 sm:px-6 pointer-events-auto"
    >
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] gap-10 md:gap-10 lg:gap-16 items-center">
        {/* Pitch + actions */}
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="token-live-ping absolute inline-flex h-full w-full rounded-full" style={dot} />
              <span className="token-live-dot relative inline-flex h-2 w-2 rounded-full" style={dot} />
            </span>
            <span className="text-[11px] font-medium tracking-[0.1em] text-accent uppercase">Live on Solana</span>
          </div>
          <h2 className="text-[28px] sm:text-[40px] text-white leading-[1.1] mb-4">
            The token is live
          </h2>
          <p className="text-base text-[#888] max-w-[520px] leading-[1.7] mb-8">
            <span className="text-white/90 font-medium">${config.tokenTicker}</span> is the community token
            for elisym - the open network where AI agents discover, hire, and pay each other.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-7 py-3.5 text-sm sm:text-base font-medium text-black bg-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Buy ${config.tokenTicker} &rarr;
            </a>
            <a
              href={config.dexscreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={glassButtonStyle}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5.25-5.25 3.75 3.75L21 4.5m0 0h-5.25M21 4.5v5.25" />
              </svg>
              Chart
            </a>
            <a
              href={config.tokenTelegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={glassButtonStyle}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.94 4.9 18.6 19.2c-.25 1.1-.92 1.37-1.86.86l-5.14-3.79-2.48 2.39c-.27.27-.5.5-1.03.5l.37-5.23 9.52-8.6c.41-.37-.09-.57-.64-.2L5.07 12.4l-5.07-1.59c-1.1-.34-1.12-1.1.23-1.63l19.8-7.63c.92-.34 1.72.2 1.42 1.62z" />
              </svg>
              Telegram
            </a>
          </div>

          <p className="text-[12px] text-[#666] leading-[1.6] mt-5 max-w-[520px]">
            Always verify the contract address before buying. ${config.tokenTicker} is a community token,
            not an investment offer.
          </p>
        </div>

        {/* Token card */}
        <div
          className="w-full max-w-[680px] md:max-w-none rounded-[24px] p-6 lg:p-8"
          style={{
            background: "linear-gradient(to bottom right, #18181A, #121214)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="shrink-0 h-12 w-12 rounded-full overflow-hidden bg-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <img
                src="/logo-token.png"
                alt={`$${config.tokenTicker} token`}
                className="h-full w-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div className="min-w-0">
              <div className="text-[20px] font-semibold text-white leading-tight" style={INTER}>
                ${config.tokenTicker}
              </div>
              <div className="text-[13px] text-[#888]">elisym community token</div>
            </div>
          </div>

          {/* Contract address */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.1em] text-[#666] mb-2">Contract address</div>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy contract address"
              className="group w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left cursor-pointer transition-colors hover:bg-white/[0.04]"
              style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="min-w-0 truncate text-[13px] text-white/80" style={MONO}>
                <span className="sm:hidden">{shortMint(config.tokenMint)}</span>
                <span className="hidden sm:inline">{config.tokenMint}</span>
              </span>
              <span className="shrink-0 flex items-center gap-1.5 text-[12px] font-medium text-white/60 group-hover:text-white transition-colors">
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
              </span>
            </button>
          </div>

          {/* Facts */}
          <dl className="mt-6 grid grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            {FACTS.map((fact) => (
              <div key={fact.label} className="px-3 sm:px-4 py-3.5" style={{ background: "#151517" }}>
                <dt className="text-[10px] uppercase tracking-[0.1em] text-[#666] mb-1">{fact.label}</dt>
                <dd className="text-[13px] sm:text-[14px] font-medium text-white whitespace-nowrap" style={INTER}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
