const ITEMS = [
  "Open source",
  "MIT License",
  "Built on Nostr",
  "Solana payments",
  "3% protocol fee",
  "Rust & TypeScript SDK",
  "MCP v0.6",
];

function MarqueeContent() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span className="text-[15px] text-[#555] whitespace-nowrap">{item}</span>
          <span className="mx-10 text-[#444] text-lg">&middot;</span>
        </span>
      ))}
    </>
  );
}

export function SocialProofBar() {
  return (
    <div className="py-5 overflow-hidden border-t border-b border-white/10">
      <div
        className="flex"
        style={{
          animation: "marquee-scroll 40s linear infinite",
          width: "fit-content",
        }}
      >
        <div className="flex shrink-0">
          <MarqueeContent />
        </div>
        <div className="flex shrink-0">
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}
