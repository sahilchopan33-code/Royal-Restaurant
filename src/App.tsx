import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { DEFAULT_RESTAURANT_CONFIG } from './data/defaultConfig';
import { MenuItem, OrderCartItem, RestaurantConfig } from './types/restaurant';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import {
  ClientCustomizerDrawer,
  CustomizerTab,
} from './components/ClientCustomizerDrawer';

const STORAGE_KEY = 'royal_restaurant_config_v1';

function loadInitialConfig(): RestaurantConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RESTAURANT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<RestaurantConfig>;
    return {
      ...DEFAULT_RESTAURANT_CONFIG,
      ...parsed,
      contact: {
        ...DEFAULT_RESTAURANT_CONFIG.contact,
        ...(parsed.contact || {}),
      },
      social: {
        ...DEFAULT_RESTAURANT_CONFIG.social,
        ...(parsed.social || {}),
      },
    };
  } catch {
    return DEFAULT_RESTAURANT_CONFIG;
  }
}

export default function App() {
  const [config, setConfig] = useState<RestaurantConfig>(loadInitialConfig);
  const [cart, setCart] = useState<OrderCartItem[]>([]);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<CustomizerTab>('brand');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [config]);

  useEffect(() => {
    document.title = `${config.brandName} — ${config.tagline}`;
  }, [config.brandName, config.tagline]);

  const openCustomizerAt = (tab: CustomizerTab) => {
    setCustomizerTab(tab);
    setCustomizerOpen(true);
  };

  const handleAddToCart = (menuItemId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menuItemId === menuItemId);
      if (existing) {
        return prev.map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItemId, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (menuItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateMenuItem = (updated: MenuItem) => {
    setConfig((prev) => ({
      ...prev,
      menu: prev.menu.map((item) => (item.id === updated.id ? updated : item)),
    }));
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setConfig((prev) => ({
      ...prev,
      menu: [...prev.menu, newItem],
    }));
  };

  const handleDeleteMenuItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      menu: prev.menu.filter((item) => item.id !== id),
    }));
    setCart((prev) => prev.filter((item) => item.menuItemId !== id));
  };

  const handleResetDefaults = () => {
    setConfig(DEFAULT_RESTAURANT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const totalOrderCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#141518]">
        <Navbar
          brandName={config.brandName}
          orderCount={totalOrderCount}
          onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
        />

        <main className="flex-1">
          <HeroSection
            brandName={config.brandName}
            tagline={config.tagline}
            heroSubtitle={config.heroSubtitle}
            heroImage={config.heroImage}
            onOpenCustomizer={() => openCustomizerAt('brand')}
          />

          <AboutSection
            brandName={config.brandName}
            heading={config.aboutHeading}
            story={config.aboutStory}
            secondaryStory={config.aboutSecondaryStory}
            image={config.aboutImage}
            pillars={config.aboutPillars}
          />

          <MenuSection
            menu={config.menu}
            currencySymbol={config.currencySymbol}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onUpdateMenuItem={handleUpdateMenuItem}
            onAddMenuItem={handleAddMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />

          <GallerySection gallery={config.gallery} />

          <TestimonialsSection
            testimonials={config.testimonials}
            onEditTestimonials={() => openCustomizerAt('testimonials')}
          />

          <ContactLocationSection
            brandName={config.brandName}
            contact={config.contact}
            onEditContact={() => openCustomizerAt('contact')}
            onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
          />
        </main>

        <Footer
          brandName={config.brandName}
          tagline={config.tagline}
          contact={config.contact}
          social={config.social}
          onEditSocial={() => openCustomizerAt('social')}
        />

        {/* Compact Floating WhatsApp Order Action */}
        <button
          type="button"
          onClick={() => setOrderDrawerOpen(true)}
          aria-label="Open WhatsApp order bag"
          className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 h-11 px-4 rounded-md bg-[#141518] text-white border border-stone-700 shadow-lg hover:bg-stone-800 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A5B21]"
        >
          <MessageCircle className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
            WhatsApp Order{totalOrderCount > 0 ? ` · ${totalOrderCount}` : ''}
          </span>
        </button>

        <WhatsAppOrderDrawer
          isOpen={orderDrawerOpen}
          onClose={() => setOrderDrawerOpen(false)}
          brandName={config.brandName}
          whatsappNumber={config.contact.whatsappNumber}
          currencySymbol={config.currencySymbol}
          menu={config.menu}
          cart={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onClearCart={() => setCart([])}
          onConfigureWhatsApp={() => {
            setOrderDrawerOpen(false);
            openCustomizerAt('contact');
          }}
        />

        <ClientCustomizerDrawer
          isOpen={customizerOpen}
          activeTab={customizerTab}
          onChangeTab={setCustomizerTab}
          onClose={() => setCustomizerOpen(false)}
          config={config}
          onChangeConfig={setConfig}
          onResetDefaults={handleResetDefaults}
        />
      </div>
    </MotionConfig>
  );
}
