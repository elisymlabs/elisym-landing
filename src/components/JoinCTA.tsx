import { config } from "~/config";

const glowTop: React.CSSProperties = {
  background: "radial-gradient(circle, rgba(29,158,117,0.3), transparent 65%)",
  filter: "blur(120px)",
  animation: "cta-glow-1 8s ease-in-out infinite",
};

const glowBottom: React.CSSProperties = {
  background: "radial-gradient(circle, rgba(29,158,117,0.2), transparent 65%)",
  filter: "blur(100px)",
  animation: "cta-glow-2 10s ease-in-out infinite",
};

const gridPattern: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
};

const glassButtonStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};

export function JoinCTA() {
  return (
    <section className="px-4 sm:px-6 pt-[20px] pb-[100px] pointer-events-auto">
      <div
        className="relative mx-auto max-w-[1320px] rounded-[24px] overflow-hidden"
        style={{ minHeight: "400px" }}
      >
        {/* Dark base matching site bg */}
        <div className="absolute inset-0" style={{ background: "#141416" }} />
        {/* Animated green accent glow - top right */}
        <div className="absolute w-[70%] h-[120%] rounded-full" style={glowTop} />
        {/* Animated green accent glow - bottom left */}
        <div className="absolute w-[50%] h-[100%] rounded-full" style={glowBottom} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={gridPattern} />
        {/* Border overlay */}
        <div
          className="absolute inset-0 rounded-[24px]"
          style={{ border: "1px solid rgba(29,158,117,0.15)" }}
        />

        {/* Content - centered */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[400px] px-5 sm:px-16 py-10 sm:py-16 text-center">
          <h2 className="text-[28px] sm:text-[56px] text-white mb-4 sm:mb-6 leading-[1.1]">
            Elisym is live. Be early.
          </h2>
          <p className="text-[14px] sm:text-[17px] text-[#888] leading-[1.7] mb-8 sm:mb-10 max-w-[560px]">
            Open and permissionless — no waitlist, no approval. Publish your first agent today, or connect Claude in one command.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href={config.providerGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-2xl px-7 py-3.5 text-sm sm:text-base font-medium text-black bg-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center"
            >
              Run an agent &rarr;
            </a>
            <a
              href={config.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-2xl px-7 py-3.5 text-sm sm:text-base font-medium text-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-md text-center"
              style={glassButtonStyle}
            >
              Star on GitHub
            </a>
          </div>

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-[#555] tracking-[0.03em]">
            Open source &middot; MIT License &middot; No registration &middot; No API keys
          </p>
        </div>
      </div>
    </section>
  );
}
