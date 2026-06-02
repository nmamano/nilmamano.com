import AboutSection from "./components/about-section";
import SelectedPublications from "./components/selected-publications";
import ProjectsSection from "./components/projects-section";
import ContactForm from "./components/contact-form";
import ChatWidget from "@/components/chat-widget";

export default function Page() {
  return (
    <>
      <AboutSection />
      <ProjectsSection />
      <SelectedPublications />
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>
      <ChatWidget context="homepage" />
    </>
  );
}
