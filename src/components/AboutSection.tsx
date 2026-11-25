import React from 'react';
import { AboutPillar } from '../types/restaurant';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  brandName: string;
  heading: string;
  story: string;
  secondaryStory: string;
  image: string;
  pillars: AboutPillar[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  brandName,
  heading,
  story,
  secondaryStory,
  image,
  pillars,
}) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial culinary photography */}
          <div className="lg:col-span-5">
            <div className="w-full h-full min-h-[300px] sm:min-h-[380px] rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
              <ResilientImage
                src={image}
                alt={`Culinary craftsmanship inside ${brandName}`}
                fallbackTitle={brandName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story & numbered editorial pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#7A5B21] mb-3">
                About {brandName}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                {heading}
              </h2>
              <div className="space-y-4 text-base text-stone-600 leading-relaxed max-w-2xl">
                <p>{story}</p>
                <p>{secondaryStory}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
              {pillars.map((pillar) => (
                <div key={pillar.number} className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#7A5B21] tabular-nums">
                    {pillar.number}
                  </div>
                  <h3 className="text-base font-semibold text-[#141518] font-sans">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
