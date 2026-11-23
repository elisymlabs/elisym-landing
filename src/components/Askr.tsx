import { config } from "~/config";
import { AskrWidgetDemo } from "~/components/AskrWidgetDemo";

const MONO = { fontFamily: "'JetBrains Mono', monospace" } as const;
const INTER = { fontFamily: "'Inter', sans-serif" } as const;

interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: "Create your store",
    description: "Open the admin and let it make a secret key for your store. No sign-up form, free to start.",
  },
  {
    title: "Add your products and policies",
    description:
      "Connect Shopify or WooCommerce, a product feed or a CSV. Add returns, shipping and warranty in your own words.",
  },
  {
    title: "Paste one line",
    description:
      "The chat appears in the corner of every page. It runs in its own shadow root, so your styles stay yours.",
  },
];

interface Highlight {
  title: string;
  description: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Never invents a price",
    description: "Every price in an answer is checked against your catalog. What you have not published, it says it does not know.",
  },
  {
    title: "Speaks your shoppers' language",
    description: "It answers in the language the shopper writes in, and the widget itself comes in ten languages.",
  },
  {
    title: "Conversations are not kept",
    description: "Chats are encrypted end to end and gone after 24 hours. No transcript archive.",
  },
  {
    title: "No store tokens",
    description: "It reads only what your shop already shows the public. No API token, no database access.",
  },
];

// The line a store pastes into its pages - colored without a syntax highlighter.
function EmbedLine() {
  return (
    <div
      className="rounded-2xl px-5 py-3.5 overflow-x-auto whitespace-nowrap text-[12px] sm:text-[12.5px]"
      style={{ background: "#101012", ...MONO }}
    >
      <span className="text-[#7DD3B0]">{"<script "}</span>
      <span className="text-[#9CC3FF]">src</span>
      <span className="text-[#CCC]">=</span>
      <span className="text-[#E5C07B]">"https://app.askr.elisym.network/widget.js"</span>{" "}
      <span className="text-[#9CC3FF]">data-store</span>
      <span className="text-[#CCC]">=</span>
      <span className="text-[#E5C07B]">"npub1..."</span>{" "}
      <span className="text-[#9CC3FF]">async</span>
      <span className="text-[#7DD3B0]">{"></script>"}</span>
    </div>
  );
}

export function Askr() {
  return (
    <section
      id="askr"
      className="px-4 pt-12.5 pb-15 sm:px-6 sm:pt-20 sm:pb-25"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="mx-auto max-w-330">
        <div className="text-accent mb-3 text-[11px] font-medium tracking-widest">ASKR</div>
        <h2 className="mb-3 text-[28px] text-[#111] sm:text-[40px] leading-[1.1]">
          Your best salesperson, on every page
        </h2>
        <p className="mb-10 max-w-[640px] text-base text-[#888] sm:mb-14">
          An AI shopping assistant for your online store. It answers shoppers in their language, finds the right
          product for their budget and sends them to your cart - every answer from your own catalog and policies.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-10 lg:gap-16 items-start">
          {/* Steps, the line to paste, actions */}
          <div className="min-w-0">
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
                  <h3 className="text-[19px] font-semibold text-[#111] mb-1.5" style={INTER}>
                    {step.title}
                  </h3>
                  <div className="text-[15px] text-[#888] leading-[1.7]">{step.description}</div>
                </div>
              </li>
            ))}
          </ol>
            <div className="mt-10">
              <EmbedLine />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={config.askrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-6 py-3 text-sm font-medium text-white bg-[#111] text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Try Askr &rarr;
              </a>
              <a
                href={config.askrDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-6 py-3 text-sm font-medium text-[#111] text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "#F0F0F0", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                Read the docs
              </a>
            </div>
          </div>

          {/* Widget preview */}
          <AskrWidgetDemo />
        </div>

        {/* Highlights */}
        <div
          className="mt-14 sm:mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "rgba(0,0,0,0.07)" }}
        >
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="bg-white py-6 sm:py-7 sm:px-6 sm:first:pl-0 lg:last:pr-0">
              <h3 className="text-[15px] font-semibold text-[#111] mb-2" style={INTER}>
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
