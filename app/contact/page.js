import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar theme="light" />
      <div className="h-[30vh] bg-white" />
      <main className="flex-grow bg-white">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
