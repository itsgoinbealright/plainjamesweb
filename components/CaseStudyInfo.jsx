"use client";

export default function CaseStudyInfo({
  type,
  architect,
  engineer,
  trades,
  photography,
  description,
}) {
  return (
    <section className="relative bg-white z-10 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Credits */}
          <div className="space-y-6">
            {type && (
              <div>
                <h4 className="text-forest-green font-medium mb-1">Type</h4>
                <p className="text-black">{type}</p>
              </div>
            )}

            {architect && (
              <div>
                <h4 className="text-forest-green font-medium mb-1">
                  Architect
                </h4>
                <p className="text-black">{architect}</p>
              </div>
            )}

            {engineer && (
              <div>
                <h4 className="text-forest-green font-medium mb-1">Engineer</h4>
                <p className="text-black">{engineer}</p>
              </div>
            )}

            {trades && (
              <div>
                <h4 className="text-forest-green font-medium mb-1">Trades</h4>
                <p className="text-black">{trades}</p>
              </div>
            )}

            {photography && (
              <div>
                <h4 className="text-forest-green font-medium mb-1">
                  Photography
                </h4>
                <p className="text-black">{photography}</p>
              </div>
            )}
          </div>

          {/* Right Columns - Description */}
          <div className="md:col-span-2">
            <div className="columns-1 md:columns-2 gap-8">
              {Array.isArray(description) ? (
                description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-black leading-relaxed mb-6 break-inside-avoid"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-black leading-relaxed">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
