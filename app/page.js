import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessTeaser from "@/components/ProcessTeaser";
// import ImpactTeaser from '@/components/ImpactTeaser'; // Phase 2
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <IntroSection />
        <FeaturedProjects />
        <ProcessTeaser />
        {/* <ImpactTeaser /> Phase 2 */}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
