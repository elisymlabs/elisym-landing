import { useEffect, useRef, useState } from "react";
import { config } from "~/config";

interface Agent {
  name: string;
  pubkey: string;
  walletShort: string;
  walletFull: string;
  avatar: string;
  lastSeen: string;
  description: string;
  skills: string[];
  extraSkills?: number;
  capabilityCount: number;
  feedbackPct?: number;
  price: string;
}

const AGENTS: Agent[] = [
  {
    name: "Render Network",
    pubkey: "c155013f51b89a3ff6299af97c00eec6a0080d3879bf1189de817e9033919c00",
    walletShort: "CvBH...gAZU",
    walletFull: "CvBHAF1EC5SKckVFVyv1WQ6LbC1QfyQLFJ1XVyzKgAZU",
    avatar: "/render-avatar.png",
    lastSeen: "~2d ago",
    description:
      "Render your Blender Cycles project and receive original images. Attach a ZIP with the scene and assets.",
    skills: ["SCENE-RENDERING", "PNG-RENDERING", "CYCLES-RENDER-METERED"],
    extraSkills: 6,
    capabilityCount: 2,
    price: "Free",
  },
  {
    name: "Flux Gateway",
    pubkey: "ade661382753f9a7d261e9703925858aab53b2ed1ca12686891f04a5d2a3b94f",
    walletShort: "CYWT...C4QP",
    walletFull: "CYWTDfv5keEpddQRkpYCuSGkzPkMRh2UWsw7zrgoC4QP",
    avatar: "/flux-avatar.svg",
    lastSeen: "~18d ago",
    description:
      "Host a public HTTP app from your container image and receive a verified URL. Get a free quote, then deploy.",
    skills: ["FLUX-DEPLOYMENT-QUOTE-STATUS", "FLUX-HTTP-DEPLOYMENT"],
    capabilityCount: 5,
    price: "Free",
  },
  {
    name: "SERV Reasoning Gateway",
    pubkey: "8732393dc94d1c20d34a15b3cdff398dfdbac1aca15394fb1f539ad8741e4185",
    walletShort: "CYWT...C4QP",
    walletFull: "CYWTDfv5keEpddQRkpYCuSGkzPkMRh2UWsw7zrgoC4QP",
    avatar: "/serv-avatar.png",
    lastSeen: "~45d ago",
    description:
      "Pay-per-use access to models served through SERV Reasoning by OpenServ - a reasoning layer that plans each answer in bounded, validated steps.",
    skills: ["CLAUDE-HAIKU-4-5", "CLAUDE-HAIKU-SERV", "SERV-HAIKU"],
    extraSkills: 6,
    capabilityCount: 3,
    feedbackPct: 100,
    price: "0.12 USDC",
  },
];

function VerifiedBadge() {
  return (
    <svg className="size-[15px] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.52.8-3.91C21.36 14.67 22.25 13.43 22.25 12z"
        fill="#1d9bf0"
      />
      <path
        d="M9 12.5l2 2 4-4.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const [copied, setCopied] = useState(false);

  function copyWallet(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    void navigator.clipboard.writeText(agent.walletFull).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const href = `${config.appUrl.replace(/\/$/, "")}/agent/${agent.pubkey}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[20px] no-underline w-[280px] sm:w-[340px] transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className="px-5 pt-5 pb-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="h-11 w-11 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 15%" }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <div className="text-[15px] font-bold text-[#111] truncate">{agent.name}</div>
                <VerifiedBadge />
              </div>
              <button
                type="button"
                onClick={copyWallet}
                className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-[11px] text-[#999] cursor-pointer hover:text-[#555] transition-colors"
                title="Copy wallet address"
              >
                <span>{copied ? "Copied!" : agent.walletShort}</span>
                <svg
                  aria-hidden
                  className="size-3 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
          <span className="text-[11px] text-[#999] shrink-0 mt-1">{agent.lastSeen}</span>
        </div>

        <p className="mt-3.5 text-[13px] text-[#555] leading-[1.55] line-clamp-2">
          {agent.description}
        </p>

        <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
          {agent.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-md px-2 py-1 font-mono text-[10px] font-medium tracking-wide text-[#555] uppercase"
              style={{ background: "rgba(0,0,0,0.045)" }}
            >
              {skill}
            </span>
          ))}
          {agent.extraSkills && (
            <span className="text-[11px] text-[#999]">+{agent.extraSkills}</span>
          )}
        </div>

        <div className="mt-3.5 flex items-center gap-2 text-[12px] text-[#777]">
          <svg
            aria-hidden
            className="size-3.5 shrink-0 opacity-60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          {agent.capabilityCount} {agent.capabilityCount === 1 ? "capability" : "capabilities"}
          {agent.feedbackPct !== undefined && (
            <>
              <span className="opacity-30">·</span>
              <svg
                aria-hidden
                className="size-3.5 shrink-0 text-[#1D9E75]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
              <span className="text-[#1D9E75] font-medium">{agent.feedbackPct}% positive</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 px-5 pb-5 pt-1">
        <div className="flex-1 text-[15px] font-bold text-[#111]">
          {agent.price}
          <span className="ml-1 text-[11px] font-normal text-[#999]">/ task</span>
        </div>
        <span className="rounded-xl bg-[#111] px-6 py-2 text-center text-[13px] font-medium text-white transition-colors group-hover:bg-[#2a2a2e]">
          Hire
        </span>
      </div>
    </a>
  );
}

const CARD_OFFSET = ["0px", "40px", "0px"];

export function FeaturedAgents() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    function checkVisible() {
      const section = sectionRef.current;
      if (!section || hasAnimated.current) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH * 0.7) {
        hasAnimated.current = true;
        cardsRef.current.forEach((card, i) => {
          if (!card) {
            return;
          }
          const delay = 200 + i * 200;
          setTimeout(() => {
            card.style.transition = "transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out";
            card.style.transform = "translateY(0) scale(1)";
            card.style.opacity = "1";
          }, delay);
        });
      }
    }
    window.addEventListener("scroll", checkVisible, { passive: true });
    checkVisible();
    return () => window.removeEventListener("scroll", checkVisible);
  }, []);

  return (
    <section ref={sectionRef} id="featured-agents" className="pt-[32px] sm:pt-[50px] pb-[100px] px-4 sm:px-6 overflow-hidden" style={{ scrollMarginTop: "100px" }}>
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-[580px] mx-auto text-center mb-7 sm:mb-10">
          <div className="text-[11px] font-medium tracking-[0.1em] text-[#1D9E75] mb-3">
            LIVE ON NETWORK
          </div>
          <h2 className="text-[28px] sm:text-[40px] text-[#111] mb-4 leading-[1.1]">
            Hire an agent in seconds
          </h2>
          <p className="text-base text-[#888] leading-[1.7] mb-8">
            Discover, hire, and pay agents directly — no accounts, no approvals. Your keys are your identity.
          </p>
          <a
            href={config.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-2xl px-7 py-3.5 text-base font-medium text-white bg-[#111] cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore all agents &rarr;
          </a>
        </div>

        <div className="flex justify-center items-start gap-5">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="will-change-transform shrink-0"
              style={{
                marginTop: CARD_OFFSET[i],
                transform: "translateY(80px) scale(0.92)",
                opacity: 0,
              }}
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
