import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { ContactDetails } from '../types/restaurant';

interface ContactLocationSectionProps {
  brandName: string;
  contact: ContactDetails;
  onEditContact: () => void;
  onOpenOrderDrawer: () => void;
}

function buildMapsEmbedSrc(raw: string, fallbackAddress: string): string | null {
  const value = raw.trim() || fallbackAddress.trim();
  if (!value) return null;

  // If user pasted an iframe HTML snippet, extract src attribute safely
  if (value.includes('<iframe')) {
    const match = value.match(/src=["']([^"']+)["']/i);
    if (match?.[1] && match[1].startsWith('https://')) {
      return match[1];
    }
  }

  // If user pasted a direct Google Maps embed URL
  if (value.startsWith('https://www.google.com/maps/embed')) {
    return value;
  }

  // Otherwise construct a clean query embed from the user-entered address/coordinates
  return `https://maps.google.com/maps?q=${encodeURIComponent(value)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function buildMapsExternalUrl(raw: string, fallbackAddress: string): string | null {
  const value = raw.trim() || fallbackAddress.trim();
  if (!value) return null;
  if (value.startsWith('https://maps.app.goo.gl') || value.startsWith('https://www.google.com/maps/place')) {
    return value;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

export const ContactLocationSection: React.FC<ContactLocationSectionProps> = ({
  brandName,
  contact,
  onEditContact,
  onOpenOrderDrawer,
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNote, setSubmittedNote] = useState(false);

  const mapsEmbedSrc = buildMapsEmbedSrc(
    contact.mapsQueryOrEmbedUrl,
    contact.address
  );
  const mapsExternalUrl = buildMapsExternalUrl(
    contact.mapsQueryOrEmbedUrl,
    contact.address
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim() || !guestContact.trim() || !guestMessage.trim()) {
      setFormError('Please complete your name, contact detail, and message.');
      return;
    }

    const emailLike = guestContact.includes('@');
    if (emailLike && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestContact.trim())) {
      setFormError('Please enter a valid email address or phone number.');
      return;
    }

    setSubmittedNote(true);
    setGuestName('');
    setGuestContact('');
    setGuestMessage('');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#7A5B21] mb-2">
              Visit &amp; Inquiries
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Contact &amp; Google Maps Location
            </h2>
          </div>

          <button
            type="button"
            onClick={onEditContact}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium bg-white text-[#141518] border border-stone-300 rounded-md hover:border-stone-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Pencil className="w-3.5 h-3.5 text-[#7A5B21]" aria-hidden="true" />
            <span>Edit Contact &amp; Map Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Editable Business Info + Direct Inquiry Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-lg border border-stone-200/90 p-6 space-y-5">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <h3 className="font-display text-2xl font-semibold text-[#141518]">
                  {brandName} Details
                </h3>
                <button
                  type="button"
                  onClick={onEditContact}
                  className="text-xs font-medium text-[#7A5B21] hover:underline cursor-pointer"
                >
                  Customize
                </button>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#7A5B21] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold text-stone-500">Address</dt>
                    <dd className="text-[#141518] mt-0.5">
                      {contact.address.trim() ? (
                        contact.address
                      ) : (
                        <span className="text-stone-500 italic">
                          [Editable Placeholder: Street Address, District, City &amp; Postal Code]
                        </span>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#7A5B21] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold text-stone-500">Opening Hours</dt>
                    <dd className="text-[#141518] mt-0.5">
                      {contact.openingHours.trim() ? (
                        contact.openingHours
                      ) : (
                        <span className="text-stone-500 italic">
                          [Editable Placeholder: e.g. Tue–Sun · 12:00 – 23:00]
                        </span>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#7A5B21] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold text-stone-500">Phone</dt>
                    <dd className="text-[#141518] mt-0.5 tabular-nums">
                      {contact.phone.trim() ? (
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:underline">
                          {contact.phone}
                        </a>
                      ) : (
                        <span className="text-stone-500 italic">
                          [Editable Placeholder: +00 000 000 0000]
                        </span>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-[#7A5B21] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold text-stone-500">WhatsApp Orders</dt>
                    <dd className="text-[#141518] mt-0.5 tabular-nums">
                      {contact.whatsappNumber.trim() ? (
                        contact.whatsappNumber
                      ) : (
                        <span className="text-stone-500 italic">
                          [Editable Placeholder: WhatsApp Number for Orders]
                        </span>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#7A5B21] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold text-stone-500">Email</dt>
                    <dd className="text-[#141518] mt-0.5">
                      {contact.email.trim() ? (
                        <a href={`mailto:${contact.email}`} className="hover:underline">
                          {contact.email}
                        </a>
                      ) : (
                        <span className="text-stone-500 italic">
                          [Editable Placeholder: email@your-restaurant.example]
                        </span>
                      )}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onOpenOrderDrawer}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
                  <span>Open WhatsApp Order Bag</span>
                </button>
              </div>
            </div>

            {/* Direct Inquiry Form (no fake booking/payment) */}
            <form
              onSubmit={handleInquirySubmit}
              className="bg-white rounded-lg border border-stone-200/90 p-6 space-y-4"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#141518]">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  For private dining questions, dietary notes, or catering inquiries.
                </p>
              </div>

              {submittedNote && (
                <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-700" />
                  <span>
                    Inquiry formatted and validated. Connect this form to your client&apos;s email endpoint or WhatsApp channel before going live.
                  </span>
                </div>
              )}

              {formError && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Full name"
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-contact" className="block text-xs font-semibold text-stone-700 mb-1">
                    Email or Phone
                  </label>
                  <input
                    id="inquiry-contact"
                    type="text"
                    value={guestContact}
                    onChange={(e) => setGuestContact(e.target.value)}
                    placeholder="Email address or phone number"
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-semibold text-stone-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Questions about menu items, allergies, or group inquiries..."
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 text-sm font-medium bg-[#FAF9F6] text-[#141518] border border-stone-300 rounded-md hover:bg-[#141518] hover:text-white hover:border-[#141518] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>

          {/* Right Column: Google Maps Location Section */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-lg border border-stone-200/90 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#141518]">
                  Google Maps Location
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {contact.address.trim() || '[Editable Placeholder: Add restaurant address or Google Maps URL]'}
                </p>
              </div>

              {mapsExternalUrl ? (
                <a
                  href={mapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-medium bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onEditContact}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-medium bg-[#7A5B21] text-white rounded-md hover:bg-[#664B1B] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Set Map Location</span>
                </button>
              )}
            </div>

            <div className="flex-1 min-h-[380px] sm:min-h-[460px] bg-stone-100 relative">
              {mapsEmbedSrc ? (
                <iframe
                  title={`${brandName} Google Maps Location`}
                  src={mapsEmbedSrc}
                  className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(#d6d3cb_1px,transparent_1px)] [background-size:20px_20px] bg-stone-100">
                  <div className="max-w-md bg-white border border-stone-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-stone-200 mx-auto flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#7A5B21]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7A5B21] mb-1">
                        Editable Google Maps Placeholder
                      </p>
                      <h4 className="font-display text-2xl font-semibold text-[#141518]">
                        No Location Invented
                      </h4>
                      <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                        Enter your restaurant client&apos;s real street address, GPS coordinates, or Google Maps embed link to activate the live interactive map preview here.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onEditContact}
                      className="inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#D4AF63]" />
                      <span>Configure Address &amp; Map</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
