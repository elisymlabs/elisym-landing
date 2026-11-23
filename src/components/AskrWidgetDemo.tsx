import { useEffect, useMemo, useRef, useState } from "react";

/*
 * The Askr widget answering a shopper on a made-up electronics store, drawn as the real widget
 * draws it and played on a loop once it is on screen. Ported from packages/askr-landing
 * (ChatDemo, WidgetPanel, niches) in the elisym monorepo. Nothing in it is live.
 */

interface Product {
  image: string;
  title: string;
  price: string;
}

const ARIA: Product = { image: "/askr/headphones-sand.webp", title: "Aria ANC headphones", price: "179.00 USD" };
const PULSE: Product = { image: "/askr/headphones-black.webp", title: "Pulse Pro headphones", price: "199.00 USD" };

interface Turn {
  question: string;
  answer: string;
  cards?: { product: Product; reason: string }[];
  comparison?: { rows: { dimension: string; cells: [string, string] }[]; recommended: Product };
  chips: string[];
}

const STORE = "Northwind Audio";

const TURNS: Turn[] = [
  {
    question: "Noise-cancelling headphones under $200 for long flights?",
    answer: "Two fit. Both last over 30 hours on a charge, and the store's warranty covers them for 2 years.",
    cards: [
      { product: ARIA, reason: "Lighter, 32 h battery" },
      { product: PULSE, reason: "Longest battery, 40 h" },
    ],
    chips: ["Compare them", "Anything cheaper?"],
  },
  {
    question: "Compare them",
    answer: "For long flights, the Pulse Pro: the longest battery. The Aria is lighter if comfort comes first.",
    comparison: {
      rows: [
        { dimension: "Battery", cells: ["32 h", "40 h"] },
        { dimension: "Weight", cells: ["250 g", "290 g"] },
        { dimension: "Warranty", cells: ["2 years", "2 years"] },
      ],
      recommended: PULSE,
    },
    chips: ["Shipping time", "Warranty details"],
  },
];

const PAUSE = 0;
const ASKED = 1;
const THINKING = 2;
const ANSWERED = 3;
const SHOWN = 4;

/** How long each phase stays (the widget's own pacing), the reading pauses aside. */
const PHASE_MS = [900, 450, 1900, 160] as const;
const TAP_MS = 650;
const READ_MS = 3400;
const FINAL_READ_MS = 6500;

interface Step {
  turn: number;
  phase: number;
  ms: number;
}

function stepsOf(turns: Turn[]): Step[] {
  return turns.flatMap((_turn, index) => {
    const last = index === turns.length - 1;
    return [
      { turn: index, phase: PAUSE, ms: index === 0 ? PHASE_MS[PAUSE] : TAP_MS },
      { turn: index, phase: ASKED, ms: PHASE_MS[ASKED] },
      { turn: index, phase: THINKING, ms: PHASE_MS[THINKING] },
      { turn: index, phase: ANSWERED, ms: PHASE_MS[ANSWERED] },
      { turn: index, phase: SHOWN, ms: last ? FINAL_READ_MS : READ_MS },
    ];
  });
}

/** The Askr mark drawn still: the rim and six rings, ink and paper by turns. */
const MARK_PATHS = [
  "M59.67 24.84 A11.00 11.00 0 0 0 40.33 24.84 L13.81 73.76 A11.00 11.00 0 0 0 23.48 90.00 L76.52 90.00 A11.00 11.00 0 0 0 86.19 73.76Z",
  "M59.74 28.42 A10.12 10.12 0 0 0 41.94 28.42 L17.54 73.42 A10.12 10.12 0 0 0 26.44 88.37 L75.24 88.37 A10.12 10.12 0 0 0 84.14 73.42Z",
  "M59.85 34.65 A8.59 8.59 0 0 0 44.76 34.65 L24.05 72.84 A8.59 8.59 0 0 0 31.60 85.52 L73.01 85.52 A8.59 8.59 0 0 0 80.56 72.84Z",
  "M59.97 40.89 A7.05 7.05 0 0 0 47.57 40.89 L30.56 72.26 A7.05 7.05 0 0 0 36.76 82.67 L70.78 82.67 A7.05 7.05 0 0 0 76.98 72.26Z",
  "M60.09 47.13 A5.52 5.52 0 0 0 50.38 47.13 L37.07 71.68 A5.52 5.52 0 0 0 41.93 79.83 L68.55 79.83 A5.52 5.52 0 0 0 73.40 71.68Z",
  "M60.21 53.36 A3.99 3.99 0 0 0 53.20 53.36 L43.59 71.09 A3.99 3.99 0 0 0 47.09 76.98 L66.32 76.98 A3.99 3.99 0 0 0 69.82 71.09Z",
  "M60.32 59.60 A2.45 2.45 0 0 0 56.01 59.60 L50.10 70.51 A2.45 2.45 0 0 0 52.25 74.13 L64.08 74.13 A2.45 2.45 0 0 0 66.24 70.51Z",
];

function AskrMark({ className }: { className?: string }) {
  return (
    <svg viewBox="12.48 19.08 75.04 70.92" className={className} aria-hidden="true" focusable="false">
      {MARK_PATHS.map((path, index) => (
        <path key={path} d={path} className={index % 2 === 0 ? "wgt-mark-ink" : "wgt-mark-paper"} />
      ))}
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2.2l2.3 10.1a1.2 1.2 0 0 0 1.2.9h8.6a1.2 1.2 0 0 0 1.2-.9L20 8H6.1" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="16.5" cy="19.5" r="1.4" />
    </svg>
  );
}

function ChatTurn({ turn, phase }: { turn: Turn; phase: number }) {
  return (
    <>
      {phase >= ASKED && <p className="wgt-mine wgt-rise">{turn.question}</p>}
      {phase >= ANSWERED && <p className="wgt-theirs wgt-rise">{turn.answer}</p>}
      {phase >= SHOWN && turn.cards !== undefined && (
        <div className="wgt-cards">
          {turn.cards.map(({ product, reason }) => (
            <div key={product.title} className="wgt-card">
              <div className="wgt-card-media">
                <img src={product.image} alt="" width={232} height={150} loading="lazy" decoding="async" />
              </div>
              <div className="wgt-card-body">
                <span className="wgt-card-title">{product.title}</span>
                <span className="wgt-reason">{reason}</span>
                <span className="wgt-price">{product.price}</span>
                <span className="wgt-cart">
                  <CartIcon />
                  Add to cart
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {phase >= SHOWN && turn.comparison !== undefined && (
        <div className="wgt-table-scroll wgt-rise">
          <table className="wgt-table">
            <thead>
              <tr>
                <th />
                {[ARIA, PULSE].map((product) => (
                  <th key={product.title}>
                    {product.title}
                    {product === turn.comparison?.recommended && <span className="wgt-label">Recommended</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Price</th>
                <td>{ARIA.price}</td>
                <td>{PULSE.price}</td>
              </tr>
              {turn.comparison.rows.map((row) => (
                <tr key={row.dimension}>
                  <th>{row.dimension}</th>
                  <td>{row.cells[0]}</td>
                  <td>{row.cells[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export function AskrWidgetDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const steps = useMemo(() => stepsOf(TURNS), []);
  const final = steps.length - 1;
  const [step, setStep] = useState(0);
  // Each loop remounts the conversation so its entrance animations play again.
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return undefined;
    }
    const node = rootRef.current;
    if (node === null) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || still) {
      return undefined;
    }
    const timer = setTimeout(() => {
      if (step === final) {
        setStep(0);
        setRun((current) => current + 1);
        return;
      }
      setStep((current) => current + 1);
    }, steps[step]?.ms ?? 1000);
    return () => clearTimeout(timer);
  }, [inView, still, step, final, steps]);

  const shown = still ? final : step;
  const now = steps[shown] ?? { turn: 0, phase: PAUSE, ms: 0 };
  const phaseOf = (turn: number) => {
    if (turn < now.turn) {
      return SHOWN;
    }
    return turn === now.turn ? now.phase : -1;
  };
  const chipsTurn = now.phase >= ANSWERED ? now.turn : now.turn - 1;
  const chips = now.phase >= ANSWERED || now.phase === PAUSE ? (TURNS[chipsTurn]?.chips ?? []) : [];
  const tapped = now.phase === PAUSE && now.turn > 0 ? TURNS[now.turn]?.question : undefined;

  // Keep the newest message in view, as the widget does.
  useEffect(() => {
    const log = logRef.current;
    if (log === null) {
      return;
    }
    if (shown === 0 || still) {
      log.scrollTop = shown === 0 ? 0 : log.scrollHeight;
      return;
    }
    log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [shown, still]);

  return (
    <figure
      ref={rootRef}
      aria-label={`The Askr chat on ${STORE}'s site. A shopper asks for noise-cancelling headphones under $200; Askr shows two from the catalog and compares them side by side.`}
      className="relative w-full max-w-[440px] h-[600px]"
    >
      <div
        key={run}
        aria-hidden="true"
        className="wgt wgt-panel wgt-panel-in h-full w-full"
      >
        <div className="wgt-header">
          <div className="min-w-0 flex-1">
            <div className="font-semibold tracking-[-0.01em]">{STORE}</div>
            <div className="wgt-muted text-[12px]">AI assistant</div>
          </div>
          <svg viewBox="0 0 24 24" className="wgt-muted h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </div>

        <div ref={logRef} className="wgt-log">
          <p className="wgt-theirs wgt-rise">Hi! Ask me anything about our products.</p>
          {TURNS.map((turn, index) => (
            <ChatTurn key={turn.question} turn={turn} phase={phaseOf(index)} />
          ))}
        </div>

        <div className="wgt-status">
          {now.phase === THINKING && (
            <span className="flex items-center gap-2">
              <AskrMark className="wgt-thinking-mark h-4 w-4" />
              Thinking...
            </span>
          )}
        </div>
        <div className="wgt-chips">
          {chips.map((chip) => (
            <span key={`${chipsTurn}-${chip}`} className={`wgt-chip ${chip === tapped ? "wgt-chip-pressed" : ""}`}>
              {chip}
            </span>
          ))}
        </div>
        <div className="wgt-composer">
          <span className="wgt-input">Ask about products...</span>
          <span className="wgt-send">Send</span>
        </div>
        <div className="wgt-muted flex items-center justify-center gap-1 px-4 pb-2.5 text-[11.5px]">
          Powered by
          <AskrMark className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#121316]">Askr</span>
        </div>
      </div>
    </figure>
  );
}
