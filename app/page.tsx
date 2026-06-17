import HeroSection from "./components/hero-section";
import HighlightsOrbit from "./components/highlights-orbit";
import HighlightsSection from "./components/highlights-section";
import ChatWidget from "@/components/chat-widget";

export default function Page() {
  return (
    <>
      <HeroSection />
      {/* Desktop: radial orbit. Mobile: linear list. */}
      <HighlightsOrbit />
      <div className="md:hidden">
        <HighlightsSection />
      </div>
      <ChatWidget context="homepage" />
    </>
  );
}
