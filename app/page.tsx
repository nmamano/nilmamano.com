import HeroSection from "./components/hero-section";
import HighlightsSection from "./components/highlights-section";
import ChatWidget from "@/components/chat-widget";

export default function Page() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <ChatWidget context="homepage" />
    </>
  );
}
