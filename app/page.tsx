import HeroSection from "./components/hero-section";
import HighlightsOrbit from "./components/highlights-orbit";
import ChatWidget from "@/components/chat-widget";

export default function Page() {
  return (
    <>
      <HeroSection />
      {/* Radial pentagon orbit on all breakpoints; details render in the ring
          center on desktop and below the ring on mobile. */}
      <HighlightsOrbit />
      <ChatWidget context="homepage" />
    </>
  );
}
