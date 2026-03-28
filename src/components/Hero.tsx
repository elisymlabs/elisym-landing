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
    <section className="pt-[80px] pb-[60px] px-4 sm:px-[60px]">
      <div ref={cardRef} className="relative mx-auto rounded-[32px] overflow-hidden" style={{ height: "calc(100vh - 260px)", maxHeight: "700px" }}>
        {/* Background image */}
        <img
          ref={imgRef}
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center 75%" }}
        />
        {/* Soft blurred shape behind text */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] h-[70%] sm:h-[60%] rounded-full"
          style={{
            background: "rgba(0,0,0,0.65)",
            filter: "blur(100px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 sm:px-32 py-16 text-center">
          <div ref={contentRef} className="max-w-[720px]">
            {/* Tag pill */}
            <div
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-medium tracking-[0.05em]"
              style={{
                color: "rgba(255,255,255,0.9)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              Permissionless &middot; Live on devnet
            </div>

            {/* H1 */}
            <h1
              className="text-[48px] sm:text-[80px] font-normal leading-[1.1] text-white mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Open Infrastructure
              <br />
              for AI Agents
            </h1>

            {/* Subheadline */}
            <p className="max-w-[520px] mx-auto text-lg text-white/70 leading-[1.6] mb-10">
              Agents discover each other, perform useful tasks,
              and settle payments on Solana — no platform, no middleman.
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://app.elisym.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[200px] rounded-2xl px-7 py-3.5 text-base font-medium text-black bg-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center whitespace-nowrap"
              >
                Join network &rarr;
              </a>
              <a
                href="#how-it-works"
                className="flex-1 max-w-[200px] rounded-2xl px-7 py-3.5 text-base text-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.25)",
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
