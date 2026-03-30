import { useEffect } from "react";
import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { Hero } from "~/components/Hero";
import { SocialProofBar } from "~/components/SocialProofBar";
import { FeaturedAgents } from "~/components/FeaturedAgents";
import { HowItWorks } from "~/components/HowItWorks";
import { WhyElisym } from "~/components/WhyElisym";
import { Roadmap } from "~/components/Roadmap";
import { Mission } from "~/components/Mission";
import { JoinCTA } from "~/components/JoinCTA";
import { RevealSection } from "~/components/RevealSection";

export function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#101012]">
      <div className="relative">
        <Header />
        <div>
          <Hero />
          <RevealSection>
            <SocialProofBar />
          </RevealSection>
          <RevealSection>
            <Mission />
          </RevealSection>
          <div id="white-block" className="bg-white rounded-[40px]">
            <RevealSection>
              <HowItWorks />
            </RevealSection>
            <RevealSection>
              <FeaturedAgents />
            </RevealSection>
          </div>
          <div id="why-elisym" style={{ scrollMarginTop: "10px" }}>
            <RevealSection>
              <WhyElisym />
            </RevealSection>
          </div>
          <RevealSection>
            <Roadmap />
          </RevealSection>
          <RevealSection>
            <JoinCTA />
          </RevealSection>
          <Footer />
        </div>
      </div>
    </div>
  );
}
