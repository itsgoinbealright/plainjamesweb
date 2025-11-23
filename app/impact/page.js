import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ImpactPage() {
  return (
    <>
      <Navbar theme="light" />
      <div className="h-[30vh] bg-white" />
      <main className="flex-grow pb-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-forest-green mb-8">
            Our Impact
          </h1>
          <p className="text-xl leading-relaxed">Coming soon - Phase 2</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
