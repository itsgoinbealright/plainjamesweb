export default function CaseStudyInfo({ project }) {
  if (!project) return null;

  const { type, credits, description } = project;
  const hasCredits = credits && Object.values(credits).some(Boolean);

  const splitValues = (value) => {
    if (!value) return [];
    return value.split(",").map((v) => v.trim());
  };

  return (
    <section className="bg-white px-5 md:px-5 py-5 md:py-24">
      <div className="flex flex-col md:flex-row md:justify-between gap-36">
        {/* Left - Scope & Credits */}
        <div className="md:w-[200px] flex-shrink-0 space-y-6">
          {type && (
            <div>
              <h4 className="text-[13px] text-blue-600 mb-1">Scope</h4>
              <div className="space-y-0.5">
                {splitValues(type).map((item, idx) => (
                  <p
                    key={idx}
                    className="text-[15px] text-stone-900 font-medium"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          {hasCredits && (
            <>
              {credits.trades && (
                <div>
                  <h4 className="text-[13px] text-blue-600 mb-1">Trades & Material</h4>
                  <div className="space-y-0.5">
                    {splitValues(credits.trades).map((item, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] text-stone-900 font-medium"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {credits.photography && (
                <div>
                  <h4 className="text-[13px] text-blue-600 mb-1">
                    Photography
                  </h4>
                  <div className="space-y-0.5">
                    {splitValues(credits.photography).map((item, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] text-stone-900 font-medium"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right - Description */}
        <div className="md:max-w-[600px] space-y-4">
          {description?.map((item, index) => (
            <p
              key={index}
              className={`text-[15px] leading-[1.75] text-stone-900 ${
                item.style || ""
              }`}
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
