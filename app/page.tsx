import AboutSection from "./components/about-section";
import SelectedPublications from "./components/selected-publications";
import ProjectsSection from "./components/projects-section";
import PersonalSection from "./components/personal-section";
import MediaKitHeader from "./components/media-kit-header";
import ContactForm from "./components/contact-form";

export default function Page() {
  return (
    <>
      <AboutSection />
      <SelectedPublications />
      <ProjectsSection />
      <PersonalSection />
      <MediaKitHeader />
      <section id="contact" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
