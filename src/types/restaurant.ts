export type MenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  dietaryNote?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  authorLabel: string;
  contextLabel: string;
  quote: string;
  isDemo: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  x: string;
  youtube: string;
}

export interface ContactDetails {
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  openingHours: string;
  mapsQueryOrEmbedUrl: string;
}

export interface AboutPillar {
  number: string;
  title: string;
  description: string;
}

export interface RestaurantConfig {
  brandName: string;
  tagline: string;
  heroSubtitle: string;
  heroImage: string;
  currencySymbol: string;
  aboutHeading: string;
  aboutStory: string;
  aboutSecondaryStory: string;
  aboutImage: string;
  aboutPillars: AboutPillar[];
  menu: MenuItem[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  contact: ContactDetails;
  social: SocialLinks;
}

export interface OrderCartItem {
  menuItemId: string;
  quantity: number;
}
