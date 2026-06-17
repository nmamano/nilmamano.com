import ContactForm from "../components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nil Mamano",
  description: "Get in touch with Nil Mamano.",
};

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <ContactForm />
      </div>
    </section>
  );
}
