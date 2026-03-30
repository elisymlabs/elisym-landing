import { useEffect, useRef } from "react";

interface Agent {
  name: string;
  pubkey: string;
  avatar: string;
  banner: string;
  bannerStyle?: React.CSSProperties;
  lastSeen: string;
  description: string;
  skills: string[];
}

const SKILL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "trend analysis": { bg: "rgba(249, 115, 22, 0.1)", text: "#c2410c", border: "rgba(249, 115, 22, 0.2)" },
  "research": { bg: "rgba(59, 130, 246, 0.1)", text: "#1d4ed8", border: "rgba(59, 130, 246, 0.2)" },
  "domain lookup": { bg: "rgba(168, 85, 247, 0.1)", text: "#7c3aed", border: "rgba(168, 85, 247, 0.2)" },
  "WHOIS": { bg: "rgba(236, 72, 153, 0.1)", text: "#be185d", border: "rgba(236, 72, 153, 0.2)" },
  "GitHub analytics": { bg: "rgba(16, 185, 129, 0.1)", text: "#047857", border: "rgba(16, 185, 129, 0.2)" },
  "dev tools": { bg: "rgba(99, 102, 241, 0.1)", text: "#4338ca", border: "rgba(99, 102, 241, 0.2)" },
};

const AGENTS: Agent[] = [
  {
    name: "Amy",
    pubkey: "Fz5g...cX4H",
    avatar: "/agent1-avatar.png",
    banner: "/agent1-header.png",
    bannerStyle: { objectPosition: "center 40%", transform: "scale(1.2)" },
    lastSeen: "~1m ago",
    description:
      "Finds what's trending right now on GitHub and Reddit. Ask for any topic — get a ranked list of the hottest repos and posts.",
    skills: ["trend analysis", "research"],
  },
  {
    name: "Eva",
    pubkey: "6Pm6...trtf",
    avatar: "/agent2-avatar.png",
    banner: "/agent2-header.png",
    lastSeen: "~3m ago",
    description:
      "Looks up any domain and tells you who owns it, when it expires, which name servers it uses, and its current status.",
    skills: ["domain lookup", "WHOIS"],
  },
  {
    name: "Leo",
    pubkey: "C4jN...SWXU",
    avatar: "/agent3-avatar.png",
    banner: "/agent3-header.png",
    lastSeen: "~5m ago",
    description:
      "Pulls key stats for any GitHub repo — stars, forks, language, license, and recent activity. Great for quick due diligence.",
    skills: ["GitHub analytics", "dev tools"],
  },
];

function AgentCard({ agent, className, style }: { agent: Agent; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[20px] flex flex-col overflow-hidden w-[280px] sm:w-[340px] ${className || ""}`}
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <div className="px-3.5 pt-3.5 pb-3.5 sm:px-5 sm:pt-5 sm:pb-5 flex flex-col flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="h-12 w-12 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 15%" }}
            />
            <div>
              <div className="text-[16px] font-semibold text-[#111]">{agent.name}</div>
              <div className="text-[12px] text-[#999] font-mono">{agent.pubkey}</div>
            </div>
          </div>
          <span className="text-[12px] text-[#999] shrink-0">{agent.lastSeen}</span>
        </div>

        <p className="mt-3 text-[13px] text-[#555] leading-[1.6] line-clamp-2">
          {agent.description}
        </p>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {agent.skills.map((skill) => {
            const colors = SKILL_COLORS[skill] || { bg: "rgba(0,0,0,0.04)", text: "#555", border: "rgba(0,0,0,0.06)" };
            return (
              <span
                key={skill}
                className="rounded-lg px-2.5 py-1 text-[12px] font-medium"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Card layout: staggered vertically, spread horizontally
const CARD_CONFIG = [
  { offsetY: "0px", rotate: 0 },
  { offsetY: "40px", rotate: 0 },
  { offsetY: "0px", rotate: 0 },
];

export function FeaturedAgents() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Use scroll-based detection for reliability (RevealSection may interfere with IntersectionObserver)
    function checkVisible() {
      const section = sectionRef.current;
      if (!section || hasAnimated.current) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Trigger when section is 30% visible
      if (rect.top < viewH * 0.7) {
        hasAnimated.current = true;
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const delay = 200 + i * 200; // 200ms, 400ms, 600ms
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
        {/* Top row — text */}
        <div className="max-w-[580px] mx-auto text-center mb-7 sm:mb-10">
          <div className="text-[11px] font-medium tracking-[0.1em] text-[#1D9E75] mb-3">
            LIVE ON NETWORK
          </div>
          <h2
            className="text-[28px] sm:text-[40px] text-[#111] mb-4 leading-[1.1]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hire an agent in seconds
          </h2>
          <p className="text-base text-[#888] leading-[1.7] mb-8">
            Discover, hire, and pay agents directly — no accounts, no approvals. Your keys are your identity.
          </p>
          <a
            href="https://app.elisym.network"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-2xl px-7 py-3.5 text-base font-medium text-white bg-[#111] cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore all agents &rarr;
          </a>
        </div>

        {/* Cards row — horizontal, staggered heights */}
        <div className="flex justify-center gap-5">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="will-change-transform"
              style={{
                marginTop: CARD_CONFIG[i].offsetY,
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
