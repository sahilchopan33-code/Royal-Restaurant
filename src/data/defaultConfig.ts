import { RestaurantConfig } from '../types/restaurant';

export const PRESET_IMAGE_LIBRARY = [
  {
    label: 'Evening Dining Table',
    url: '/src/assets/images/hero_royal_dining_1795625446960.jpg',
  },
  {
    label: 'Chef Plating at the Pass',
    url: '/src/assets/images/about_chef_plating_1795625447602.jpg',
  },
  {
    label: 'Heirloom Burrata Starter',
    url: '/src/assets/images/dish_burrata_heirloom_1795625450538.jpg',
  },
  {
    label: 'Black Truffle Mushroom Risotto',
    url: '/src/assets/images/dish_truffle_risotto_1795625448067.jpg',
  },
  {
    label: 'Herb-Crusted Rack of Lamb',
    url: '/src/assets/images/dish_herb_lamb_rack_1795625447571.jpg',
  },
  {
    label: 'Pan-Seared Salmon & Saffron',
    url: '/src/assets/images/dish_seared_salmon_1795625448789.jpg',
  },
  {
    label: 'Dark Chocolate Ganache Tart',
    url: '/src/assets/images/dish_chocolate_tart_1795625451343.jpg',
  },
  {
    label: 'Smoked Rosemary Botanical Elixir',
    url: '/src/assets/images/dish_craft_elixir_1795625450661.jpg',
  },
];

export const DEFAULT_RESTAURANT_CONFIG: RestaurantConfig = {
  brandName: 'Royal Restaurant',
  tagline: 'Timeless Culinary Craft & Contemporary Hospitality',
  heroSubtitle:
    'Seasonal ingredients prepared with precision, served in an atmosphere designed for unhurried dining.',
  heroImage: '/src/assets/images/hero_royal_dining_1795625446960.jpg',
  currencySymbol: '$',
  aboutHeading: 'A kitchen guided by provenance, technique, and warmth.',
  aboutStory:
    'At Royal Restaurant, every service begins at dawn with hand-selected seasonal produce, heritage grains, and line-caught seafood. Our kitchen balances classic European roasting and reduction methods with bright contemporary restraint.',
  aboutSecondaryStory:
    'Designed as an adaptable hospitality showcase, every detail of this story, menu, and location profile can be tailored effortlessly for your dining room.',
  aboutImage: '/src/assets/images/about_chef_plating_1795625447602.jpg',
  aboutPillars: [
    {
      number: '01.',
      title: 'Seasonal Sourcing',
      description: 'Menus evolve naturally around peak-harvest ingredients and trusted regional growers.',
    },
    {
      number: '02.',
      title: 'Scratch Preparation',
      description: 'Stocks, reductions, sourdough, and pastry components are crafted fresh daily in-house.',
    },
    {
      number: '03.',
      title: 'Attentive Pacing',
      description: 'Unhurried table service calibrated for intimate dinners, celebrations, and takeaways.',
    },
  ],
  menu: [
    {
      id: 'dish-burrata',
      name: 'Heirloom Tomato & Artisanal Burrata',
      category: 'Starters',
      description: 'Creamy burrata, ripe heirloom tomatoes, cold-pressed basil oil, flaky sea salt, and charred sourdough.',
      price: 16,
      image: '/src/assets/images/dish_burrata_heirloom_1795625450538.jpg',
      dietaryNote: 'Vegetarian',
    },
    {
      id: 'dish-risotto',
      name: 'Black Truffle & Wild Mushroom Risotto',
      category: 'Mains',
      description: 'Acquerello carnaroli rice slowly simmered in roasted mushroom stock with shaved black truffle and aged crisp.',
      price: 28,
      image: '/src/assets/images/dish_truffle_risotto_1795625448067.jpg',
      dietaryNote: 'Vegetarian · Gluten-Free',
    },
    {
      id: 'dish-lamb',
      name: 'Herb-Crusted Rack of Lamb',
      category: 'Mains',
      description: 'Pasture-raised rack of lamb with rosemary crust, parsnip silk, roasted baby carrots, and red wine jus.',
      price: 38,
      image: '/src/assets/images/dish_herb_lamb_rack_1795625447571.jpg',
      dietaryNote: 'Signature Course',
    },
    {
      id: 'dish-salmon',
      name: 'Crispy-Skin Atlantic Salmon',
      category: 'Mains',
      description: 'Pan-roasted salmon fillet over saffron beurre blanc, charred tenderstem broccoli, and garden herbs.',
      price: 32,
      image: '/src/assets/images/dish_seared_salmon_1795625448789.jpg',
      dietaryNote: 'Gluten-Free',
    },
    {
      id: 'dish-tart',
      name: 'Valrhona Dark Chocolate Ganache Tart',
      category: 'Desserts',
      description: '70% single-origin chocolate ganache in cocoa sablé with fresh berries and Madagascar vanilla gelato.',
      price: 15,
      image: '/src/assets/images/dish_chocolate_tart_1795625451343.jpg',
      dietaryNote: 'Contains Dairy & Nuts',
    },
    {
      id: 'dish-elixir',
      name: 'Smoked Rosemary Citrus Elixir',
      category: 'Beverages',
      description: 'House-pressed blood orange and yuzu botanical infusion finished with charred rosemary aroma.',
      price: 11,
      image: '/src/assets/images/dish_craft_elixir_1795625450661.jpg',
      dietaryNote: 'Zero-Proof Craft',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Evening Candlelit Dining Room',
      caption: 'Intimate stone tables set for dinner service',
      image: '/src/assets/images/hero_royal_dining_1795625446960.jpg',
    },
    {
      id: 'gal-2',
      title: 'Finishing at the Kitchen Pass',
      caption: 'Precision plating before table service',
      image: '/src/assets/images/about_chef_plating_1795625447602.jpg',
    },
    {
      id: 'gal-3',
      title: 'Herb-Crusted Rack of Lamb',
      caption: 'Roasted heirloom carrots and parsnip puree',
      image: '/src/assets/images/dish_herb_lamb_rack_1795625447571.jpg',
    },
    {
      id: 'gal-4',
      title: 'Black Truffle Mushroom Risotto',
      caption: 'Handcrafted stoneware bowl presentation',
      image: '/src/assets/images/dish_truffle_risotto_1795625448067.jpg',
    },
    {
      id: 'gal-5',
      title: 'Atlantic Salmon & Saffron Velouté',
      caption: 'Crisp skin sear with tenderstem greens',
      image: '/src/assets/images/dish_seared_salmon_1795625448789.jpg',
    },
    {
      id: 'gal-6',
      title: 'Dark Chocolate Ganache Tart',
      caption: 'Finished with gold leaf and vanilla bean gelato',
      image: '/src/assets/images/dish_chocolate_tart_1795625451343.jpg',
    },
  ],
  testimonials: [
    {
      id: 'demo-1',
      authorLabel: 'Sample Guest Profile A',
      contextLabel: 'Demo Testimonial Placeholder · Evening Tasting',
      quote:
        'Demo review placeholder: "Warm, attentive pacing from arrival to dessert, with standout seasoning on the roasted mains and balanced presentation."',
      isDemo: true,
    },
    {
      id: 'demo-2',
      authorLabel: 'Sample Guest Profile B',
      contextLabel: 'Demo Testimonial Placeholder · Private Dinner',
      quote:
        'Demo review placeholder: "Replace this sample text with a verified quote from a real diner once your restaurant client supplies approved feedback."',
      isDemo: true,
    },
    {
      id: 'demo-3',
      authorLabel: 'Sample Guest Profile C',
      contextLabel: 'Demo Testimonial Placeholder · Takeaway Order',
      quote:
        'Demo review placeholder: "Ordering directly through WhatsApp made coordinating our family dinner quick and clear—easily customizable per client."',
      isDemo: true,
    },
  ],
  contact: {
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    openingHours: '',
    mapsQueryOrEmbedUrl: '',
  },
  social: {
    instagram: '',
    facebook: '',
    x: '',
    youtube: '',
  },
};
