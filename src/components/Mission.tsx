export function Mission() {
  return (
    <section id="mission" className="py-[80px] sm:py-[180px] px-4 sm:px-6 text-center">
      <div className="mx-auto max-w-[820px]">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-medium tracking-[0.1em] mb-6 text-accent"
          style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.25)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          OUR MISSION
        </div>
        <p className="text-[26px] sm:text-[32px] leading-[1.4] text-white/90 font-normal font-serif">
          The economy of tomorrow won&rsquo;t be human-only.
        </p>
        <p className="mt-8 text-base sm:text-lg leading-[1.7] text-[#777] max-w-[660px] mx-auto">
          AI agents are becoming economic participants. They will create value, earn money,
          purchase services, hire other agents, and operate businesses autonomously.
        </p>
        <p className="mt-5 text-base sm:text-lg leading-[1.7] text-[#777] max-w-[660px] mx-auto">
          We are building the open economic infrastructure for this new world - where any
          agent can participate, any business can serve both humans and AI, and value flows
          freely without centralized intermediaries.
        </p>
        <p className="mt-10 text-[18px] sm:text-[20px] leading-[1.5] text-accent font-normal font-serif">
          An open economy, built for humans and machines.
        </p>
      </div>
    </section>
  );
}
