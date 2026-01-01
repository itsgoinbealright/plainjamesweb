export default function CaseStudyInfo({ project }) {
  if (!project) return null;

  const { type, credits } = project;
  const hasCredits = credits && Object.values(credits).some(Boolean);

  const splitValues = (value) => {
    if (!value) return [];
    return value.split(",").map((v) => v.trim());
  };

  return (
    <section className="bg-white px-5 md:px-5 py-5 md:py-6">
      <div className="flex flex-row justify-between lg:justify-start lg:gap-36">
        {type && (
          <div>
            <h4 className="text-[13px] text-blue-600 mb-1">Our Scope</h4>
            <div className="space-y-0.5">
              {splitValues(type).map((item, idx) => (
                <p key={idx} className="text-[15px] text-stone-900 font-medium">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}

        {hasCredits && credits.trades && (
          <div>
            <h4 className="text-[13px] text-blue-600 mb-1">
              Trades & Material
            </h4>
            <div className="space-y-0.5">
              {splitValues(credits.trades).map((item, idx) => (
                <p key={idx} className="text-[15px] text-stone-900 font-medium">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Photography - Desktop only */}
        {hasCredits && credits.photography && (
          <div className="hidden lg:block">
            <h4 className="text-[13px] text-blue-600 mb-1">Photography</h4>
            <div className="space-y-0.5">
              {splitValues(credits.photography).map((item, idx) => (
                <p key={idx} className="text-[15px] text-stone-900 font-medium">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
