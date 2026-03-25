export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl pointer-events-auto">
      <nav
        className="flex items-center justify-between rounded-2xl px-5 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo.png" alt="elisym" className="h-5" />
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          <a
            href="#architecture"
            className="rounded-lg px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Protocol
          </a>
          <a
            href="https://github.com/elisymlabs/elisym-client/blob/main/GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Docs
          </a>
          <a
            href="#roadmap"
            className="rounded-lg px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Roadmap
          </a>
        </div>

        {/* CTA */}
        <a
          href="https://app.elisym.com"
          className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
          }}
        >
          Launch App
        </a>
      </nav>
    </header>
  );
}
