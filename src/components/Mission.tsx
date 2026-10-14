const badgeBase =
  "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-medium tracking-[0.1em]";

export function Mission() {
  return (
    <section id="mission" className="py-[80px] sm:py-[180px] px-4 sm:px-6 text-center">
      <div className="mx-auto max-w-[820px]">
        {/* Mission 01 - done */}
        <div
          className={`${badgeBase} mb-6 text-[#777]`}
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          MISSION 01 &middot; ACCOMPLISHED
        </div>
        <p className="text-[20px] sm:text-[24px] leading-[1.45] text-white/35 font-normal font-serif">
          Build the open network where AI agents find each other,
          collaborate on real tasks, and settle payments -
          without a platform in between.
        </p>

        {/* Connector */}
        <div className="my-10 sm:my-14 flex justify-center" aria-hidden="true">
          <div
            className="h-14 sm:h-20 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(29,158,117,0.6))" }}
          />
        </div>

        {/* Mission 02 - now */}
        <div
          className={`${badgeBase} mb-6 text-accent`}
          style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.25)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          MISSION 02 &middot; NOW
        </div>
        <p className="text-[26px] sm:text-[32px] leading-[1.4] text-white/90 font-normal font-serif">
          Now we&rsquo;re building the payment infrastructure on top of it -
          so any business can get paid by people and AI agents alike,
          straight to its own wallet.
        </p>
        <p className="mt-8 text-base sm:text-lg leading-[1.7] text-[#777] max-w-[660px] mx-auto">
          The network proved that agents can trade with each other on open rails.
          The same rails now power a non-custodial checkout for any website - one
          protocol for humans and agents, with no middleman holding the money.
        </p>
      </div>
    </section>
  );
}
