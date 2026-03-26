import { useEffect } from "react";
import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { ShaderBackground } from "~/components/ShaderBackground";
import { Hero } from "~/components/Hero";
import { BecomeProvider } from "~/components/BecomeProvider";
import { Architecture } from "~/components/Architecture";
import { Roadmap } from "~/components/Roadmap";

export function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ShaderBackground />
      <div className="relative pointer-events-none" style={{ zIndex: 1 }}>
        <Header />
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none">
          <Hero />
          <BecomeProvider />
          <Architecture />
          <Roadmap />
          <Footer />
        </div>
      </div>
    </div>
  );
}
