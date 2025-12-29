"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  finishedSheetGoods,
  boxSheetGoods,
  osmoFinishes,
  osmoWaxColors,
  hardwoods,
  linolieColors,
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

        {/* Materials Accordion */}
        <section className="px-4 py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-4xl md:ml-0 md:mr-auto lg:max-w-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              Materials
            </h2>

            <div className="lg:max-w-none">
              <Accordion title="Sheet Goods">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 tracking-tight">
                      Finished
                    </h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {finishedSheetGoods.map((item) => (
                        <p key={item.id} className="text-lg tracking-tight">
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 tracking-tight">
                      Box
                    </h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {boxSheetGoods.map((item) => (
                        <p key={item.id} className="text-lg tracking-tight">
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Hardwoods">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
                  {hardwoods?.map((item) => (
                    <p key={item.id} className="text-lg tracking-tight">
                      {item.name}
                    </p>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Finishes">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 tracking-tight">
                      OSMO Oils
                    </h4>
                    <div className="space-y-2">
                      {osmoFinishes?.map((item) => (
                        <p key={item.id} className="text-lg tracking-tight">
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 tracking-tight">
                      OSMO Wood Wax
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {osmoWaxColors?.map((wax) => (
                        <div key={wax.id} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: wax.color }}
                          />
                          <span className="text-base tracking-tight">
                            {wax.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 tracking-tight">
                      Linolie & Pigment
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {linolieColors?.map((color) => (
                        <div key={color.id} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.color }}
                          />
                          <span className="text-base tracking-tight">
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Joinery & Style">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {joineryStyles?.map((style) => (
                    <div key={style.id}>
                      <h4 className="text-lg font-bold tracking-tight mb-1">
                        {style.name}
                      </h4>
                      <p className="text-base text-gray-600 tracking-tight leading-snug">
                        {style.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
