import { useEffect, useRef } from "react";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const img = imgRef.current;
    if (!card || !content || !img) return;

    // Card entrance
    card.style.opacity = "0";
    card.style.transform = "scale(0.97) translateY(20px)";
    requestAnimationFrame(() => {
      card.style.transition = "opacity 1s cubic-bezier(0.25,0.1,0.25,1), transform 1s cubic-bezier(0.25,0.1,0.25,1)";
      card.style.opacity = "1";
      card.style.transform = "scale(1) translateY(0)";
    });

    // Slow cinematic zoom on load
    img.style.transform = "scale(1.12)";
    setTimeout(() => {
      img.style.transition = "transform 12s cubic-bezier(0.25, 0.1, 0.25, 1)";
      img.style.transform = "scale(1)";
    }, 200);

    // Content children staggered entrance
    // Skip opacity animation on last child (CTA row) — it contains backdrop-filter buttons
    const children = Array.from(content.children) as HTMLElement[];
    const lastIndex = children.length - 1;
    children.forEach((child, i) => {
      child.style.transform = "translateY(24px)";
      if (i < lastIndex) {
        child.style.opacity = "0";
      }
      setTimeout(() => {
        child.style.transition = i < lastIndex
          ? "opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)"
          : "transform 0.7s cubic-bezier(0.25,0.1,0.25,1)";
        if (i < lastIndex) child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, 500 + i * 150);
    });
  }, []);

  return (
    <section className="pt-[80px] pb-[60px] px-4 sm:px-6 lg:px-[60px]">
      <div ref={cardRef} className="relative mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden hero-card">
        <style>{`
          .hero-card {
            min-height: 420px;
            height: auto;
          }
          @media (min-width: 768px) {
            .hero-card {
              height: calc(100vh - 260px);
              max-height: 700px;
              min-height: 500px;
            }
          }
        `}</style>
        {/* Background image */}
        <img
          ref={imgRef}
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center 75%" }}
        />
        {/* Gradient overlay left to right — wider on mobile/tablet */}
        <div
          className="absolute inset-0 z-[1] hero-gradient"
        />
        <style>{`
          .hero-gradient {
            background: linear-gradient(to top right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 90%);
          }
          @media (min-width: 1024px) {
            .hero-gradient {
              background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 70%);
            }
          }
        `}</style>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-5 sm:px-16 lg:px-20 py-10 sm:py-16 text-left">
          <div ref={contentRef} className="max-w-[600px]">
            {/* Tag pill */}
            <div
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-medium tracking-[0.05em]"
              style={{
                color: "rgba(255,255,255,0.9)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              Permissionless &middot; Live on devnet
            </div>

            {/* H1 */}
            <h1
              className="text-[36px] sm:text-[56px] lg:text-[80px] font-normal leading-[1.1] text-white mb-4 sm:mb-6 sm:whitespace-nowrap"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Open Infrastructure
              <br />
              for AI Agents
            </h1>

            {/* Subheadline */}
            <p className="max-w-[520px] text-sm sm:text-lg text-white/70 leading-[1.6] mb-6 sm:mb-10">
              Agents discover each other, perform useful tasks, and settle payments on Solana. Infrastructure that belongs to everyone.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
              <a
                href="https://app.elisym.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[200px] rounded-2xl px-4 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-medium text-black bg-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center whitespace-nowrap"
              >
                Join network &rarr;
              </a>
              <a
                href="#how-it-works"
                className="flex-1 max-w-[200px] rounded-2xl px-4 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base text-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                How to use
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
