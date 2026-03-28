import { useState, useEffect, useRef } from "react";

export function Header() {
  const [onLight, setOnLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(-20px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1), transform 0.8s cubic-bezier(0.25,0.1,0.25,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300);
    }
  }, []);

  useEffect(() => {
    function check() {
      setScrolled(window.scrollY > 20);

      const whiteBlock = document.getElementById("white-block");
      if (!whiteBlock) return;
      const rect = whiteBlock.getBoundingClientRect();
      setOnLight(rect.top < 48 && rect.bottom > 48);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Outer shell — always full width, provides the "stage" */}
      <div className="pointer-events-auto px-4 sm:px-[60px]">
        {/* Inner container that morphs */}
        <div
          style={{
            maxWidth: scrolled ? "960px" : "100%",
            margin: "0 auto",
            marginTop: scrolled ? "16px" : "0",
            transition: "max-width 0.6s cubic-bezier(0.4, 0, 0, 1), margin-top 0.6s cubic-bezier(0.4, 0, 0, 1), border-radius 0.6s cubic-bezier(0.4, 0, 0, 1), background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
            borderRadius: scrolled ? "100px" : "0",
            ...(scrolled
              ? onLight
                ? {
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(24px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(0, 0, 0, 0.04)",
                  }
                : {
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(24px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                  }
              : {
                  background: "transparent",
                  border: "1px solid transparent",
                  boxShadow: "none",
                  backdropFilter: "blur(0px)",
                  WebkitBackdropFilter: "blur(0px)",
                } as React.CSSProperties),
          }}
        >
          <nav
            className="flex items-center justify-between"
            style={{
              padding: scrolled ? "8px 8px 8px 20px" : "18px 0",
              transition: "padding 0.6s cubic-bezier(0.4, 0, 0, 1)",
            }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src={onLight ? "/logo-black.png" : "/logo.png"}
                alt="elisym"
                style={{
                  height: scrolled ? "19px" : "24px",
                  transition: "height 0.6s cubic-bezier(0.4, 0, 0, 1)",
                }}
              />
            </a>

            {/* Nav links */}
            <div className="hidden sm:flex items-center gap-2">
              {[
                { label: "Mission", href: "#mission" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Agents", href: "#featured-agents" },
                { label: "Why Elisym", href: "#why-elisym" },
                { label: "Roadmap", href: "#roadmap" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`rounded-full py-1.5 whitespace-nowrap transition-colors duration-300 ${
                    onLight
                      ? "text-black/45 hover:text-black"
                      : "text-white/45 hover:text-white"
                  }`}
                  style={{
                    fontSize: scrolled ? "14px" : "14px",
                    padding: scrolled ? "6px 14px" : "6px 16px",
                    transition: "font-size 0.6s cubic-bezier(0.4,0,0,1), padding 0.6s cubic-bezier(0.4,0,0,1), color 0.3s ease",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/elisymlabs"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full py-1.5 transition-colors duration-300 ${
                  onLight
                    ? "text-black/45 hover:text-black"
                    : "text-white/45 hover:text-white"
                }`}
                style={{
                  padding: scrolled ? "6px 10px" : "6px 16px",
                  transition: "padding 0.6s cubic-bezier(0.4,0,0,1), color 0.3s ease",
                }}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    width: scrolled ? "16px" : "18px",
                    height: scrolled ? "16px" : "18px",
                    transition: "width 0.6s cubic-bezier(0.4,0,0,1), height 0.6s cubic-bezier(0.4,0,0,1)",
                  }}
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/elisymlabs"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full py-1.5 transition-colors duration-300 ${
                  onLight
                    ? "text-black/45 hover:text-black"
                    : "text-white/45 hover:text-white"
                }`}
                style={{
                  padding: scrolled ? "6px 10px" : "6px 16px",
                  transition: "padding 0.6s cubic-bezier(0.4,0,0,1), color 0.3s ease",
                }}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    width: scrolled ? "16px" : "18px",
                    height: scrolled ? "16px" : "18px",
                    transition: "width 0.6s cubic-bezier(0.4,0,0,1), height 0.6s cubic-bezier(0.4,0,0,1)",
                  }}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* CTA + burger */}
            <div className="flex items-center gap-2">
              <a
                href="https://app.elisym.network"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  fontSize: scrolled ? "13px" : "14px",
                  padding: scrolled ? "9px 20px" : "8px 16px",
                  borderRadius: scrolled ? "100px" : "12px",
                  transition: "font-size 0.6s cubic-bezier(0.4,0,0,1), padding 0.6s cubic-bezier(0.4,0,0,1), border-radius 0.6s cubic-bezier(0.4,0,0,1), background 0.3s ease, transform 0.2s ease",
                  ...(onLight
                    ? {
                        background: "#111111",
                        border: "1px solid #111111",
                      }
                    : {
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }),
                }}
              >
                Join network
              </a>

              {/* Burger button — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`sm:hidden flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-colors ${
                  onLight ? "text-black/60" : "text-white/60"
                }`}
                style={{
                  background: onLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)",
                  border: onLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {menuOpen ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <div
            className="sm:hidden overflow-hidden"
            style={{
              maxHeight: menuOpen ? "400px" : "0",
              opacity: menuOpen ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0, 1), opacity 0.3s ease",
              ...(menuOpen
                ? {
                    background: onLight ? "rgba(255,255,255,0.85)" : "rgba(20,20,22,0.9)",
                    backdropFilter: "blur(24px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                    borderTop: onLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
                    marginTop: "4px",
                    borderRadius: "0 0 20px 20px",
                  }
                : {}),
            }}
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {[
                { label: "Mission", href: "#mission" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Agents", href: "#featured-agents" },
                { label: "Why Elisym", href: "#why-elisym" },
                { label: "Roadmap", href: "#roadmap" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                    onLight
                      ? "text-black/70 hover:bg-black/5"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 px-4 pt-2">
                <a
                  href="https://github.com/elisymlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${onLight ? "text-black/40 hover:text-black" : "text-white/40 hover:text-white"}`}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/elisymlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${onLight ? "text-black/40 hover:text-black" : "text-white/40 hover:text-white"}`}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
