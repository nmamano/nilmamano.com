import AboutSection from "./components/about-section";
import ResearchSection from "./components/research-section";
import ProjectsSection from "./components/projects-section";
import PersonalSection from "./components/personal-section";
import MediaKitSection from "./components/media-kit-section";

export default function Page() {
  return (
    <>
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <PersonalSection />
      <MediaKitSection />
    </>
  );
}
