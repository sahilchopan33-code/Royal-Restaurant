import React, { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  orderCount: number;
  onOpenOrderDrawer: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  brandName,
  orderCount,
  onOpenOrderDrawer,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#141518] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A5B21]"
        >
          {brandName}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 border-b border-transparent hover:border-[#7A5B21] hover:text-[#141518] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A5B21]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action (desktop) + mobile drawer trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium bg-[#141518] text-[#FAF9F6] rounded-md hover:bg-[#27292E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A5B21]"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
            <span>
              WhatsApp Order{orderCount > 0 ? ` (${orderCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#141518] hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F6] px-4 py-3">
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-stone-200/70">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] flex items-center text-sm font-medium text-stone-700 hover:text-[#141518]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
