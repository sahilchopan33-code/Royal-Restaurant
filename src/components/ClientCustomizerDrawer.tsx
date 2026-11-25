import React, { useState } from 'react';
import { Download, RotateCcw, Upload, X, Plus, Trash2 } from 'lucide-react';
import { RestaurantConfig, TestimonialItem } from '../types/restaurant';
import { PRESET_IMAGE_LIBRARY } from '../data/defaultConfig';

export type CustomizerTab =
  | 'brand'
  | 'about'
  | 'contact'
  | 'testimonials'
  | 'social';

interface ClientCustomizerDrawerProps {
  isOpen: boolean;
  activeTab: CustomizerTab;
  onChangeTab: (tab: CustomizerTab) => void;
  onClose: () => void;
  config: RestaurantConfig;
  onChangeConfig: (next: RestaurantConfig) => void;
  onResetDefaults: () => void;
}

const TABS: Array<{ id: CustomizerTab; label: string }> = [
  { id: 'brand', label: 'Brand & Hero' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact & Maps' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'social', label: 'Social & Export' },
];

export const ClientCustomizerDrawer: React.FC<ClientCustomizerDrawerProps> = ({
  isOpen,
  activeTab,
  onChangeTab,
  onClose,
  config,
  onChangeConfig,
  onResetDefaults,
}) => {
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.brandName.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError('');
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed.brandName || !Array.isArray(parsed.menu)) {
          setImportError('Invalid restaurant configuration JSON file.');
          return;
        }
        onChangeConfig(parsed as RestaurantConfig);
      } catch {
        setImportError('Unable to parse JSON configuration file.');
      }
    };
    reader.readAsText(file);
  };

  const updateTestimonial = (index: number, patch: Partial<TestimonialItem>) => {
    const updated = config.testimonials.map((item, i) =>
      i === index ? { ...item, ...patch } : item
    );
    onChangeConfig({ ...config, testimonials: updated });
  };

  const addTestimonial = () => {
    const next: TestimonialItem = {
      id: `review-${Date.now()}`,
      authorLabel: 'New Guest Name',
      contextLabel: 'Verified Visit · Date',
      quote: 'Enter genuine guest feedback here.',
      isDemo: true,
    };
    onChangeConfig({
      ...config,
      testimonials: [...config.testimonials, next],
    });
  };

  const deleteTestimonial = (index: number) => {
    onChangeConfig({
      ...config,
      testimonials: config.testimonials.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
    >
      <div className="w-full max-w-xl bg-[#FAF9F6] h-full flex flex-col border-l border-stone-200 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <h2 id="customizer-title" className="font-display text-2xl font-semibold text-[#141518]">
              Client Customization Studio
            </h2>
            <p className="text-xs text-stone-500">
              Changes save automatically in your browser and update every section live.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization studio"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-stone-500 hover:text-[#141518] hover:bg-stone-100 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 py-2.5 bg-white border-b border-stone-200 flex items-center gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#141518] text-white'
                  : 'text-stone-600 hover:text-[#141518] hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) =>
                    onChangeConfig({ ...config, brandName: e.target.value })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Tagline
                </label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) =>
                    onChangeConfig({ ...config, tagline: e.target.value })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={config.heroSubtitle}
                  onChange={(e) =>
                    onChangeConfig({ ...config, heroSubtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={config.currencySymbol}
                    onChange={(e) =>
                      onChangeConfig({ ...config, currencySymbol: e.target.value })
                    }
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hero Backdrop Preset
                  </label>
                  <select
                    value={config.heroImage}
                    onChange={(e) =>
                      onChangeConfig({ ...config, heroImage: e.target.value })
                    }
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-stone-300 rounded-md"
                  >
                    {PRESET_IMAGE_LIBRARY.map((p) => (
                      <option key={p.url} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  About Heading
                </label>
                <input
                  type="text"
                  value={config.aboutHeading}
                  onChange={(e) =>
                    onChangeConfig({ ...config, aboutHeading: e.target.value })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Story Paragraph
                </label>
                <textarea
                  rows={3}
                  value={config.aboutStory}
                  onChange={(e) =>
                    onChangeConfig({ ...config, aboutStory: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Secondary Story Paragraph
                </label>
                <textarea
                  rows={2}
                  value={config.aboutSecondaryStory}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      aboutSecondaryStory: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600 bg-white p-3 rounded-md border border-stone-200">
                Leave any field blank to show a clearly labelled editable placeholder until your restaurant client provides verified business details.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Placeholder (e.g. +1 555 010 0000)"
                  value={config.contact.phone}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: { ...config.contact, phone: e.target.value },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Number (with country code for direct orders)
                </label>
                <input
                  type="text"
                  placeholder="Digits with country code (e.g. 15550100000)"
                  value={config.contact.whatsappNumber}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        whatsappNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="Placeholder (e.g. reservations@clientdomain.com)"
                  value={config.contact.email}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: { ...config.contact, email: e.target.value },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="Placeholder (e.g. Street, District, City)"
                  value={config.contact.address}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: { ...config.contact, address: e.target.value },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  placeholder="Placeholder (e.g. Tue–Sun · 12:00 – 23:00)"
                  value={config.contact.openingHours}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        openingHours: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Google Maps Address Query or Embed URL
                </label>
                <input
                  type="text"
                  placeholder="Enter full address, coordinates, or Google Maps embed URL"
                  value={config.contact.mapsQueryOrEmbedUrl}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        mapsQueryOrEmbedUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                />
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-stone-600">
                  Keep &ldquo;Demo Content&rdquo; checked for sample placeholders, or uncheck when adding verified client reviews.
                </p>
                <button
                  type="button"
                  onClick={addTestimonial}
                  className="inline-flex items-center gap-1 min-h-[36px] px-3 py-1.5 text-xs font-medium bg-[#141518] text-white rounded-md hover:bg-stone-800 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {config.testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-4 bg-white rounded-lg border border-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.isDemo}
                        onChange={(e) =>
                          updateTestimonial(idx, { isDemo: e.target.checked })
                        }
                        className="rounded border-stone-300"
                      />
                      <span>Mark as Demo Content</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(idx)}
                      aria-label="Delete testimonial"
                      className="text-stone-400 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={t.authorLabel}
                    onChange={(e) =>
                      updateTestimonial(idx, { authorLabel: e.target.value })
                    }
                    placeholder="Guest Name or Sample Label"
                    className="w-full min-h-[38px] px-3 py-1.5 text-sm border border-stone-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={t.contextLabel}
                    onChange={(e) =>
                      updateTestimonial(idx, { contextLabel: e.target.value })
                    }
                    placeholder="Context / Visit Type"
                    className="w-full min-h-[38px] px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                  />
                  <textarea
                    rows={2}
                    value={t.quote}
                    onChange={(e) =>
                      updateTestimonial(idx, { quote: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-sm border border-stone-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-stone-500">
                  Social Media Links
                </h3>
                {(
                  [
                    { key: 'instagram', label: 'Instagram URL' },
                    { key: 'facebook', label: 'Facebook URL' },
                    { key: 'x', label: 'X (Twitter) URL' },
                    { key: 'youtube', label: 'YouTube URL' },
                  ] as const
                ).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="url"
                      placeholder={`https://... (leave empty for placeholder)`}
                      value={config.social[field.key]}
                      onChange={(e) =>
                        onChangeConfig({
                          ...config,
                          social: {
                            ...config.social,
                            [field.key]: e.target.value,
                          },
                        })
                      }
                      className="w-full min-h-[40px] px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-stone-500">
                  Client Template Portability
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Export this customized restaurant configuration as JSON to reuse or archive for future paying clients, or import an existing client JSON file.
                </p>

                {importError && (
                  <p className="text-xs text-red-700 font-medium">{importError}</p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium bg-[#141518] text-white rounded-md hover:bg-stone-800 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF63]" />
                    <span>Export Config JSON</span>
                  </button>

                  <label className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium bg-white border border-stone-300 rounded-md hover:bg-stone-50 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#7A5B21]" />
                    <span>Import Config JSON</span>
                    <input
                      type="file"
                      accept="application/json"
                      onChange={handleImportJson}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-red-700 border border-stone-300 rounded-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-5 py-2 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
