import React from 'react';
import { Pencil } from 'lucide-react';
import { TestimonialItem } from '../types/restaurant';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onEditTestimonials: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onEditTestimonials,
}) => {
  const hasDemoItems = testimonials.some((t) => t.isDemo);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-[#F4F2ED] border-b border-stone-200/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#7A5B21] mb-2">
              Guest Perspectives
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Testimonials &amp; Review Placeholders
            </h2>
          </div>

          <button
            type="button"
            onClick={onEditTestimonials}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium bg-white text-[#141518] border border-stone-300 rounded-md hover:border-stone-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Pencil className="w-3.5 h-3.5 text-[#7A5B21]" aria-hidden="true" />
            <span>Edit Testimonials</span>
          </button>
        </div>

        {/* Explicit transparent notice when demo content is displayed */}
        {hasDemoItems && (
          <div className="mb-8 px-4 py-3 rounded-md bg-white border border-stone-300 text-sm text-stone-700 flex flex-wrap items-center justify-between gap-3">
            <span>
              <strong>Demo Content Notice:</strong> The testimonials below are sample placeholders for client presentation. Replace them with verified diner feedback before launch.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg border border-stone-200/90 p-6 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="text-xs text-stone-500 mb-3 flex items-center gap-2">
                  <span className="font-semibold text-[#7A5B21]">
                    {item.isDemo ? 'Demo Content' : 'Verified Guest'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.contextLabel}</span>
                </div>

                <blockquote className="text-base text-[#141518] leading-relaxed">
                  {item.quote}
                </blockquote>
              </div>

              <div className="pt-4 border-t border-stone-100 text-sm font-semibold text-stone-700">
                {item.authorLabel}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
