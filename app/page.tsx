import AboutSection from "./components/about-section";
import SelectedPublications from "./components/selected-publications";
import ProjectsSection from "./components/projects-section";
import ContactForm from "./components/contact-form";

export default function Page() {
  return (
    <>
      <AboutSection />
      <SelectedPublications />
      <ProjectsSection />
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
