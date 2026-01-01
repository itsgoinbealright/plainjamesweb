"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import MaterialCarousel from "@/components/MaterialCarousel";
import {
  woods,
  boxMaterials,
  osmoPolyx,
  osmoWoodWax,
  linolie,
  joineryStyles,
} from "@/lib/materialsData";

function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </span>
        <span className="text-2xl text-gray-400">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && <div className="pb-8">{children}</div>}
    </div>
  );
}

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
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <main className="flex-grow bg-white">
        {/* Intro Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl md:ml-0 md:mr-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
              How we build
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 tracking-tight leading-tight font-bold">
              This is how we work — the materials, finishes, and details that go
              into every project. Consider it a reference for what's possible.
            </p>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 tracking-tight leading-tight font-bold mt-4">
              Fill out the form, send an email, or DM us on Instagram to get
              started. The more context, the faster we move.
            </p>

            <div className="pt-12">
              <Link
                href="/contact"
                className="inline-block border-2 border-black text-black px-8 py-3 font-bold tracking-tight hover:bg-black hover:text-white transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="px-4 py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-4xl md:ml-0 md:mr-auto lg:max-w-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              Materials
            </h2>

            <div className="lg:max-w-none">
              {/* Forward Facing */}
              <Accordion title="Forward Facing" defaultOpen={true}>
                <MaterialCarousel
                  title="Sheet Goods & Hardwoods"
                  items={woods}
                  showType={true}
                />
              </Accordion>

              {/* Box Materials */}
              <Accordion title="Box Materials">
                <MaterialCarousel title="Interior" items={boxMaterials} />
              </Accordion>

              {/* Finishes */}
              <Accordion title="Finishes">
                <MaterialCarousel
                  title="OSMO Polyx"
                  items={osmoPolyx}
                  size="small"
                />
                <MaterialCarousel
                  title="OSMO Wood Wax"
                  items={osmoWoodWax}
                  size="small"
                />
                <MaterialCarousel
                  title="Linolie & Pigment"
                  items={linolie}
                  size="small"
                />
              </Accordion>

              {/* Joinery & Style */}
              <Accordion title="Joinery & Style">
                <MaterialCarousel title="Styles" items={joineryStyles} />
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
