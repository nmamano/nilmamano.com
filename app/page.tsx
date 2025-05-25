import AboutSection from "./components/about-section";
import SelectedPublications from "./components/selected-publications";
import ProjectsSection from "./components/projects-section";
import PersonalSection from "./components/personal-section";
import MediaKitHeader from "./components/media-kit-header";

export default function Page() {
  return (
    <>
      <AboutSection />
      <SelectedPublications />
      <ProjectsSection />
      <PersonalSection />
      <MediaKitHeader />
    </>
  );
}
