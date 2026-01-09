// app/process/page.js
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import MaterialCarousel from "@/components/MaterialCarousel";
import {
  woods,
  boxMaterials,
  osmoWoodWax,
  linolie,
  joineryStyles,
} from "@/lib/materialsData";

function Accordion({
  id,
  title,
  children,
  isOpen,
  onToggle,
  level = 1,
  hideBorder = false,
}) {
  const sizes = {
    1: "text-xl md:text-2xl",
    2: "text-lg md:text-xl",
    3: "text-base md:text-lg",
  };

  return (
    <div className={hideBorder ? "" : "border-b border-gray-200"}>
      <button
        onClick={() => onToggle(id)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className={`font-bold tracking-tight ${sizes[level]}`}>
          {title}
        </span>
        <span
          className={`text-gray-400 ${level === 1 ? "text-2xl" : "text-xl"}`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && <div className="pb-8">{children}</div>}
    </div>
  );
}

export default function ProcessPage() {
  const [openAccordion, setOpenAccordion] = useState("forward-facing");
  const [openFinish, setOpenFinish] = useState("varnish");
  const [openJoinery, setOpenJoinery] = useState("design-direction");

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleFinishToggle = (id) => {
    setOpenFinish(openFinish === id ? null : id);
  };

  const handleJoineryToggle = (id) => {
    setOpenJoinery(openJoinery === id ? null : id);
  };

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              How we build
            </h1>

            <div className="space-y-12">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 tracking-tight leading-tight font-bold">
                We're carpenters and millworkers first. Most of our time is
                spent in the shop and on site—building cabinets, milling custom
                pieces, and installing the work we've made. We partner with
                designers, architects, and general contractors who bring us into
                their projects. Clear scope, efficient builds, great results.
                <br />
                <br />
                We also take on smaller projects directly—kitchens, built-ins,
                custom pieces for people who know what they want. If you're
                still working out the design, we work with local designers who
                can help shape the project before we get involved. Reach out and
                we'll make an introduction.
                <br />
                <br />
                There's an advantage to working with a trade on a small project.
                We're hands-on from fabrication through install—materials,
                joinery, site conditions. Fewer handoffs means fewer surprises,
                and issues get caught early because we're the ones doing the
                work.
              </p>
            </div>

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

        {/* Materials & Finishes Section */}
        <section className="px-4 py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-4xl md:ml-0 md:mr-auto lg:max-w-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              Materials &amp; Finishes
            </h2>

            <div className="lg:max-w-none">
              {/* Forward Facing Materials */}
              <Accordion
                id="forward-facing"
                title="Forward Facing Materials"
                level={1}
                isOpen={openAccordion === "forward-facing"}
                onToggle={handleToggle}
              >
                <MaterialCarousel items={woods} showType={true} />
              </Accordion>

              {/* Cabinet Box Materials */}
              <Accordion
                id="cabinet-box"
                title="Cabinet Box Materials"
                level={1}
                isOpen={openAccordion === "cabinet-box"}
                onToggle={handleToggle}
              >
                <MaterialCarousel items={boxMaterials} />
              </Accordion>

              {/* Stain & Finishes */}
              <Accordion
                id="stain-finishes"
                title="Stain & Finishes"
                level={1}
                isOpen={openAccordion === "stain-finishes"}
                onToggle={handleToggle}
              >
                <Accordion
                  id="varnish"
                  title="Varnish"
                  level={2}
                  isOpen={openFinish === "varnish"}
                  onToggle={handleFinishToggle}
                >
                  <div className="py-4 flex gap-6 items-start">
                    <div className="w-24 h-24 flex-shrink-0 relative">
                      <Image
                        src="/images/materials/osmo-logo.png"
                        alt="OSMO"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-xl">
                      OSMO Polyx-Oil. A hard-wax oil finish that&apos;s wipe-on,
                      durable, and repairable on site. Available in matte,
                      satin, or gloss. Food-safe once cured — ideal for
                      kitchens, dining tables, and anything that sees daily use.
                    </p>
                  </div>
                </Accordion>

                <Accordion
                  id="wood-wax"
                  title="Wood Wax"
                  level={2}
                  isOpen={openFinish === "wood-wax"}
                  onToggle={handleFinishToggle}
                >
                  <div className="py-4 max-w-2xl">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      OSMO Wood Wax. Adds subtle color while protecting the
                      surface. Shifts tone without hiding the grain. Same
                      wipe-on application, same easy repairs.
                    </p>
                  </div>
                  <MaterialCarousel items={osmoWoodWax} />
                </Accordion>

                <Accordion
                  id="linseed"
                  title="Linseed Oils"
                  level={2}
                  isOpen={openFinish === "linseed"}
                  onToggle={handleFinishToggle}
                  hideBorder={true}
                >
                  <div className="py-4 max-w-2xl">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Linolie &amp; Pigment. Imported from Denmark — a premium,
                      sustainable finish that soaks deep into the grain. Natural
                      pigments, no film on the surface. Longer cure time, higher
                      cost, but unmatched depth and feel. Worth it for the right
                      piece.
                    </p>
                  </div>
                  <MaterialCarousel items={linolie} />
                </Accordion>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Joinery & Style Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl md:ml-0 md:mr-auto lg:max-w-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
              Joinery &amp; Style
            </h2>

            <div className="lg:max-w-none">
              <Accordion
                id="design-direction"
                title="Design Direction"
                level={1}
                isOpen={openJoinery === "design-direction"}
                onToggle={handleJoineryToggle}
              >
                <MaterialCarousel items={joineryStyles} />
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
