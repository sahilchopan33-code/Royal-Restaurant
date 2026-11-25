import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { ContactDetails, SocialLinks } from '../types/restaurant';

interface FooterProps {
  brandName: string;
  tagline: string;
  contact: ContactDetails;
  social: SocialLinks;
  onEditSocial: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandName,
  tagline,
  contact,
  social,
  onEditSocial,
}) => {
  const socialItems = [
    { key: 'instagram', label: 'Instagram', url: social.instagram, Icon: Instagram },
    { key: 'facebook', label: 'Facebook', url: social.facebook, Icon: Facebook },
    { key: 'x', label: 'X', url: social.x, Icon: Twitter },
    { key: 'youtube', label: 'YouTube', url: social.youtube, Icon: Youtube },
  ] as const;

  return (
    <footer className="bg-[#121316] text-stone-300 border-t border-stone-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#top"
              className="font-display text-3xl font-semibold text-white tracking-tight inline-block"
            >
              {brandName}
            </a>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {tagline}
            </p>
            <p className="text-xs text-stone-500">
              {contact.address.trim() || '[Editable Placeholder: Restaurant Address]'}
              {' · '}
              {contact.openingHours.trim() || '[Editable Placeholder: Opening Hours]'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#D4AF63]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Food Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Food Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#D4AF63]">
              Social Media
            </h3>
            <p className="text-xs text-stone-400">
              Connect your client&apos;s official social profiles in the Customizer.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {socialItems.map(({ key, label, url, Icon }) =>
                url.trim() ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-medium text-stone-200 bg-stone-900 border border-stone-700 rounded-md hover:border-[#D4AF63] hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                ) : (
                  <button
                    key={key}
                    type="button"
                    onClick={onEditSocial}
                    title={`Set ${label} link (currently placeholder)`}
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-medium text-stone-400 bg-stone-900/60 border border-stone-800 rounded-md hover:border-stone-600 hover:text-stone-200 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-stone-500" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <p>
            Customizable hospitality template · Replace placeholder details before publishing.
          </p>
        </div>
      </div>
    </footer>
  );
};
