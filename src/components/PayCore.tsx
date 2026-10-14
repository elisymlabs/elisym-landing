import type { ReactNode } from "react";
import { config } from "~/config";

const MONO = { fontFamily: "'JetBrains Mono', monospace" } as const;

interface Step {
  title: string;
  description: ReactNode;
}

const STEPS: Step[] = [
  {
    title: "Start your store node",
    description: (
      <>
        Run <code className="text-[13px] text-[#333]" style={MONO}>npx @elisym/merchant-node init</code>{" "}
        and list your products. No platform account, no approval to wait for.
      </>
    ),
  },
  {
    title: "Add the Buy button",
    description:
      "One tag per product. The checkout opens in a modal, reads your live offer, and asks the buyer's wallet to pay you.",
  },
  {
    title: "Get paid and fulfil",
    description:
      "Your node confirms the payment on chain and fires a signed webhook so your backend can deliver or credit the account.",
  },
];

interface Highlight {
  title: string;
  description: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Nobody holds your money",
    description: "Payments go from the buyer's wallet straight to yours. No server of ours touches the funds.",
  },
  {
    title: "AI agents buy too",
    description: "Agents purchase through the elisym MCP with a quote, user approval, and a spend limit.",
  },
  {
    title: "An admin panel included",
    description: "Sign in with your store key to see orders, totals, and customers. Nothing to install.",
  },
  {
    title: "Open and verifiable",
    description: "Open-source checkout, on-chain receipts, and domain-verified stores buyers can trust.",
  },
];

// Purely presentational - colors the snippet without a syntax highlighter.
function Snippet() {
  const tag = "text-[#7DD3B0]";
  const attr = "text-[#9CC3FF]";
  const str = "text-[#E5C07B]";
  return (
    <pre
      className="overflow-x-auto text-[12.5px] sm:text-[13.5px] leading-[1.8] text-[#CCC] p-5 sm:p-7"
      style={MONO}
    >
      <span className="text-[#666]">{"<!-- This is the whole integration -->"}</span>
      {"\n"}
      <span className={tag}>{"<elisym-buy"}</span>
      {"\n  "}
      <span className={attr}>product</span>=<span className={str}>"naddr1..."</span>
      {"\n  "}
      <span className={attr}>network</span>=<span className={str}>"mainnet"</span>
      <span className={tag}>{">"}</span>
      <span className={tag}>{"</elisym-buy>"}</span>
      {"\n\n"}
      <span className={tag}>{"<script"}</span>
      {"\n  "}
      <span className={attr}>src</span>=<span className={str}>"https://pay.elisym.network/v3/embed.js"</span>
      <span className={tag}>{">"}</span>
      <span className={tag}>{"</script>"}</span>
    </pre>
  );
}

export function PayCore() {
  return (
    <section
      id="pay-core"
      className="px-4 pt-12.5 pb-15 sm:px-6 sm:pt-20 sm:pb-25"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="mx-auto max-w-330">
        <div className="text-accent mb-3 text-[11px] font-medium tracking-widest">PAY CORE</div>
        <h2 className="mb-3 text-[28px] text-[#111] sm:text-[40px] leading-[1.1]">
          A checkout that works like a protocol, not a platform
        </h2>
        <p className="mb-10 max-w-[640px] text-base text-[#888] sm:mb-14">
          Add a Buy button to any page. Buyers pay in stablecoins straight to your wallet, your own
          node confirms every payment on chain, and AI agents can buy from you too.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Steps */}
          <ol className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-[14px] font-semibold text-[#333]"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", background: "#FFFFFF", ...MONO }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3
                    className="text-[19px] font-semibold text-[#111] mb-1.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <div className="text-[15px] text-[#888] leading-[1.7]">{step.description}</div>
                </div>
              </li>
            ))}
          </ol>

          {/* Code card */}
          <div>
            <div
              className="rounded-[20px] overflow-hidden"
              style={{ background: "#101012", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
            >
              <div
                className="flex items-center gap-1.5 px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-3 text-[12px] text-[#666]" style={MONO}>
                  index.html
                </span>
              </div>
              <Snippet />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={config.payCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-6 py-3 text-sm font-medium text-white bg-[#111] text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Start selling &rarr;
              </a>
              <a
                href={config.commerceDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-6 py-3 text-sm font-medium text-[#111] text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "#F0F0F0", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                Read the quickstart
              </a>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div
          className="mt-14 sm:mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "rgba(0,0,0,0.07)" }}
        >
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="bg-white py-6 sm:py-7 sm:px-6 sm:first:pl-0 lg:last:pr-0">
              <h3
                className="text-[15px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-[#888]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
