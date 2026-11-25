import React from 'react';
import { ArrowDownRight, SlidersHorizontal } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  brandName: string;
  tagline: string;
  heroSubtitle: string;
  heroImage: string;
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brandName,
  tagline,
  heroSubtitle,
  heroImage,
  onOpenCustomizer,
}) => {
  return (
    <section
      id="top"
      className="relative w-full min-h-[540px] lg:min-h-[640px] flex items-end overflow-hidden bg-[#121316]"
    >
      {/* Full-bleed atmospheric backdrop */}
      <div className="absolute inset-0">
        <ResilientImage
          src={heroImage}
          alt={`${brandName} evening dining room table setting`}
          eager={true}
          fallbackTitle={brandName}
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#121316]/92 via-[#121316]/55 to-[#121316]/30"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-[#D4AF63] mb-3">
            {tagline}
          </p>

          <h1
            className="font-display text-white font-semibold tracking-tight leading-[1.04] mb-5"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              textWrap: 'balance',
            }}
          >
            {brandName}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl mb-8">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 text-sm font-semibold bg-[#D4AF63] text-[#141518] rounded-md hover:bg-[#DFBE7B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore Menu</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onOpenCustomizer}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 text-sm font-medium text-stone-100 border border-white/30 bg-black/25 backdrop-blur-sm rounded-md hover:bg-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
              <span>Customize Site</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
