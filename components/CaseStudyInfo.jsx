/**
 * CaseStudyInfo
 * 
 * Project information section - appears before the gallery.
 * Left: Type & credits with blue labels
 * Right: Description in columns
 * Mobile: Description first, then credits
 * 
 * Props:
 * - project: Full project object from projectsData
 */

export default function CaseStudyInfo({ project }) {
  if (!project) return null;

  const { type, credits, description } = project;
  const hasCredits = credits && Object.values(credits).some(Boolean);

  return (
    <section className="bg-white px-5 md:px-10 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-24">
          
          {/* Left - Type & Credits (shows second on mobile) */}
          <div className="order-2 lg:order-1 lg:w-[200px] flex-shrink-0">
            <div className="space-y-6">
              {/* Type */}
              {type && (
                <div>
                  <h4 className="text-[13px] text-blue-600 mb-1">
                    Type
                  </h4>
                  <p className="text-[15px] text-stone-900 font-medium">
                    {type}
                  </p>
                </div>
              )}

              {/* Credits */}
              {hasCredits && (
                <>
                  {credits.architect && (
                    <div>
                      <h4 className="text-[13px] text-blue-600 mb-1">
                        Architect
                      </h4>
                      <p className="text-[15px] text-stone-900 font-medium">
                        {credits.architect}
                      </p>
                    </div>
                  )}
                  {credits.engineer && (
                    <div>
                      <h4 className="text-[13px] text-blue-600 mb-1">
                        Engineer
                      </h4>
                      <p className="text-[15px] text-stone-900 font-medium">
                        {credits.engineer}
                      </p>
                    </div>
                  )}
                  {credits.trades && (
                    <div>
                      <h4 className="text-[13px] text-blue-600 mb-1">
                        Trades
                      </h4>
                      <p className="text-[15px] text-stone-900 font-medium">
                        {credits.trades}
                      </p>
                    </div>
                  )}
                  {credits.photography && (
                    <div>
                      <h4 className="text-[13px] text-blue-600 mb-1">
                        Photography
                      </h4>
                      <p className="text-[15px] text-stone-900 font-medium">
                        {credits.photography}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right - Description (shows first on mobile) */}
          <div className="order-1 lg:order-2 lg:max-w-[600px]">
            {description && description.length > 0 && (
              <div className="space-y-6">
                {description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-[1.75] text-stone-900"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}