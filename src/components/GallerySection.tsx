import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GalleryItem } from '../types/restaurant';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % gallery.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + gallery.length) % gallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, gallery.length]);

  const activeItem = activeIndex !== null ? gallery[activeIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#7A5B21] mb-2">
              Visual Showcase
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              From the Kitchen &amp; Dining Room
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-sm">
            Select any photograph to inspect plating details in full view.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`group relative overflow-hidden rounded-lg border border-stone-200 bg-stone-100 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A5B21] ${
                idx === 0 ? 'sm:col-span-2 aspect-[16/9] sm:aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              <ResilientImage
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 sm:opacity-75 group-hover:opacity-95 transition-opacity duration-200"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                    {item.caption}
                  </p>
                </div>
                <span className="w-9 h-9 rounded-md bg-white/15 backdrop-blur-xs text-white flex items-center justify-center shrink-0 group-hover:bg-[#D4AF63] group-hover:text-[#141518] transition-colors">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery preview"
            className="absolute top-4 right-4 w-11 h-11 rounded-md bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex - 1 + gallery.length) % gallery.length)
            }
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-md bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="w-full max-h-[75vh] aspect-[4/3] rounded-lg overflow-hidden bg-[#121316]">
              <ResilientImage
                src={activeItem.image}
                alt={activeItem.title}
                fallbackTitle={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <h3 className="font-display text-2xl font-semibold">
                {activeItem.title}
              </h3>
              <p className="text-sm text-stone-300 mt-1">
                {activeItem.caption} · {activeIndex + 1} / {gallery.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % gallery.length)}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-md bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
