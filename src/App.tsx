import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { Hero } from "~/components/Hero";
import { Stats } from "~/components/Stats";
import { AgentList } from "~/components/AgentList";
import { TryIt } from "~/components/TryIt";

export function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <AgentList />
      <TryIt />
      <Footer />
    </div>
  );
}
