import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProcessPage() {
  return (
    <>
      <Navbar theme="dark" />

      {/* Full-height Hero Video */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/processvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <main className="flex-grow bg-white">
        {/* Two-Column Section: Intro + Process List */}
        <section className="px-6 py-16 md:py-24 md:px-12 lg:px-24 xl:px-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Introduction */}
            <div className="pt-7">
              <p className="text-base md:text-lg text-gray-900 font-light leading-snug tracking-tight">
                Every project begins with understanding your space and vision.
                From initial contact to final walkthrough, we handle each step
                with precision and care.
              </p>
            </div>

            {/* Right Column - Process Steps */}
            <div>
              {/* Step 1 - Discovery */}
              <div className="mb-6">
                <h2 className="text-base md:text-lg font-bold mb-1 tracking-tight">
                  Discovery
                </h2>
                <p className="text-base md:text-lg text-gray-900 font-normal leading-snug tracking-tight">
                  We begin with a conversation about your project—reviewing
                  photos, discussing your needs, and exploring design
                  possibilities. Reach out via our contact form or email
                  howdy@plainjames.ca. This helps us align on vision, budget,
                  and timeline before moving forward.
                </p>
              </div>

              {/* Step 2 - Quotation */}
              <div className="mb-6">
                <h2 className="text-base md:text-lg font-bold mb-1 tracking-tight">
                  Quotation
                </h2>
                <p className="text-base md:text-lg text-gray-900 font-normal leading-snug tracking-tight">
                  Based on our discovery meeting, we develop a design proposal
                  and job estimate. You'll receive a transparent quote that
                  breaks down materials, labor, and project management. Once we
                  sign off, we get to work.
                </p>
              </div>

              {/* Step 3 - Management & Fabrication */}
              <div className="mb-6">
                <h2 className="text-base md:text-lg font-bold mb-1 tracking-tight">
                  Management & Fabrication
                </h2>
                <p className="text-base md:text-lg text-gray-900 font-normal leading-snug tracking-tight">
                  We coordinate fabrication, material ordering, and
                  installation. Throughout the project, we keep you informed and
                  ensure everything moves forward smooth as possible.
                </p>
              </div>

              {/* Step 4 - Walkthrough */}
              <div className="mb-6">
                <h2 className="text-base md:text-lg font-bold mb-1 tracking-tight">
                  Walkthrough
                </h2>
                <p className="text-base md:text-lg text-gray-900 font-normal leading-snug tracking-tight">
                  After install, we walk through the completed project together.
                  We're available to address any questions and ensure you're
                  completely satisfied with the finished work.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}