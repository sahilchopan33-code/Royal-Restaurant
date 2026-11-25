import React, { useState } from 'react';
import { Pencil, Plus, Check, Trash2, Upload, X, Minus } from 'lucide-react';
import { MenuCategory, MenuItem, OrderCartItem } from '../types/restaurant';
import { PRESET_IMAGE_LIBRARY } from '../data/defaultConfig';
import { ResilientImage } from './ResilientImage';

interface MenuSectionProps {
  menu: MenuItem[];
  currencySymbol: string;
  cart: OrderCartItem[];
  onAddToCart: (menuItemId: string) => void;
  onUpdateCartQuantity: (menuItemId: string, delta: number) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
  onAddMenuItem: (newItem: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
}

const CATEGORIES: Array<'All' | MenuCategory> = [
  'All',
  'Starters',
  'Mains',
  'Desserts',
  'Beverages',
];

const EDITABLE_CATEGORIES: MenuCategory[] = [
  'Starters',
  'Mains',
  'Desserts',
  'Beverages',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  menu,
  currencySymbol,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onUpdateMenuItem,
  onAddMenuItem,
  onDeleteMenuItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | MenuCategory>('All');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const filteredMenu =
    selectedCategory === 'All'
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  const getItemQty = (id: string) =>
    cart.find((c) => c.menuItemId === id)?.quantity ?? 0;

  const openNewDishEditor = () => {
    setIsCreatingNew(true);
    setEditingItem({
      id: `dish-${Date.now()}`,
      name: 'New Seasonal Dish',
      category: selectedCategory === 'All' ? 'Mains' : selectedCategory,
      description: 'Describe ingredients, preparation method, and garnish.',
      price: 24,
      image: PRESET_IMAGE_LIBRARY[2].url,
      dietaryNote: '',
    });
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const sanitized: MenuItem = {
      ...editingItem,
      name: editingItem.name.trim() || 'Untitled Dish',
      price: Number.isFinite(editingItem.price) && editingItem.price >= 0 ? editingItem.price : 0,
    };
    if (isCreatingNew) {
      onAddMenuItem(sanitized);
    } else {
      onUpdateMenuItem(sanitized);
    }
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditingItem({ ...editingItem, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#F4F2ED] border-b border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section header & toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#7A5B21] mb-2">
              Seasonal Selection
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Curated Food &amp; Beverage Menu
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditMode((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isEditMode
                  ? 'bg-[#141518] text-white border-[#141518]'
                  : 'bg-white text-[#141518] border-stone-300 hover:border-stone-400'
              }`}
            >
              {isEditMode ? (
                <>
                  <Check className="w-4 h-4 text-[#D4AF63]" aria-hidden="true" />
                  <span>Done Editing Menu</span>
                </>
              ) : (
                <>
                  <Pencil className="w-3.5 h-3.5 text-[#7A5B21]" aria-hidden="true" />
                  <span>Edit Menu Items</span>
                </>
              )}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={openNewDishEditor}
                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium rounded-md bg-[#7A5B21] text-white hover:bg-[#664B1B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Dish</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-stone-200/75 rounded-lg mb-8"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#141518] shadow-sm'
                    : 'text-stone-600 hover:text-[#141518]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {isEditMode && (
          <div className="mb-8 px-4 py-3 rounded-md bg-white border border-stone-300 text-sm text-stone-700 flex flex-wrap items-center justify-between gap-2">
            <span>
              Menu Edit Mode active — click <strong>Edit</strong> on any dish to customize its name, photo, category, or price for your client.
            </span>
          </div>
        )}

        {/* Menu Grid */}
        {filteredMenu.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-lg border border-stone-200">
            <p className="text-base text-stone-600 mb-4">
              No dishes in the {selectedCategory} category yet.
            </p>
            <button
              type="button"
              onClick={openNewDishEditor}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-sm font-medium rounded-md bg-[#141518] text-white hover:bg-stone-800 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish to {selectedCategory}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredMenu.map((item) => {
              const qty = getItemQty(item.id);
              return (
                <article
                  key={item.id}
                  className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* 4:3 Dish Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <ResilientImage
                      src={item.image}
                      alt={item.name}
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        <span>{item.category}</span>
                        {item.dietaryNote && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.dietaryNote}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="font-display text-xl sm:text-[22px] font-semibold text-[#141518] leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-base font-semibold text-[#7A5B21] tabular-nums shrink-0">
                          {currencySymbol}
                          {item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-sm text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      {isEditMode ? (
                        <div className="w-full flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingItem({ ...item });
                            }}
                            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-medium bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer flex-1"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Edit Dish</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteMenuItem(item.id)}
                            aria-label={`Delete ${item.name}`}
                            className="inline-flex items-center justify-center min-h-[40px] w-10 text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : qty > 0 ? (
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-stone-600">
                            In WhatsApp Order
                          </span>
                          <div className="inline-flex items-center border border-stone-300 rounded-md bg-[#FAF9F6]">
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(item.id, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="w-9 h-9 flex items-center justify-center text-[#141518] hover:bg-stone-200/70 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-sm font-semibold text-[#141518] tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(item.id, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-9 h-9 flex items-center justify-center text-[#141518] hover:bg-stone-200/70 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => onAddToCart(item.id)}
                            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium bg-[#FAF9F6] text-[#141518] border border-stone-300 rounded-md hover:bg-[#141518] hover:text-white hover:border-[#141518] transition-colors duration-150 cursor-pointer flex-1 whitespace-nowrap"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Add to Order</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingItem({ ...item });
                            }}
                            aria-label={`Edit ${item.name}`}
                            title="Customize dish name, image, or price"
                            className="inline-flex items-center justify-center min-h-[40px] w-10 text-stone-500 hover:text-[#141518] border border-stone-200 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Dish Editor Modal */}
      {editingItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-editor-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-white rounded-lg border border-stone-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <h3 id="dish-editor-title" className="font-display text-2xl font-semibold text-[#141518]">
                {isCreatingNew ? 'Add New Dish' : 'Customize Menu Item'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                aria-label="Close dish editor"
                className="w-9 h-9 inline-flex items-center justify-center rounded-md text-stone-500 hover:text-[#141518] hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Dish Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as MenuCategory,
                      })
                    }
                    className="w-full min-h-[42px] px-3 py-2 text-sm border border-stone-300 rounded-md bg-white focus:outline-2 focus:outline-[#7A5B21]"
                  >
                    {EDITABLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Price ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm border border-stone-300 rounded-md tabular-nums focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Dietary or Course Note (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian · Gluten-Free"
                  value={editingItem.dietaryNote || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, dietaryNote: e.target.value })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                />
              </div>

              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <label className="block text-xs font-semibold text-stone-700">
                  Dish Image (URL, Upload, or Preset)
                </label>
                <input
                  type="text"
                  placeholder="/src/assets/images/... or https://..."
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full min-h-[40px] px-3.5 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 min-h-[38px] px-3.5 py-1.5 text-xs font-medium border border-stone-300 rounded-md hover:bg-stone-50 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#7A5B21]" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="sr-only"
                    />
                  </label>

                  <select
                    aria-label="Choose a preset culinary photo"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditingItem({ ...editingItem, image: e.target.value });
                      }
                    }}
                    className="min-h-[38px] px-3 py-1.5 text-xs border border-stone-300 rounded-md bg-white"
                  >
                    <option value="">Choose Preset Photo...</option>
                    {PRESET_IMAGE_LIBRARY.map((preset) => (
                      <option key={preset.url} value={preset.url}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="aspect-[4/3] w-40 rounded-md overflow-hidden border border-stone-200">
                  <ResilientImage
                    src={editingItem.image}
                    alt={editingItem.name}
                    fallbackTitle={editingItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreatingNew(false);
                  }}
                  className="min-h-[40px] px-4 py-2 text-sm font-medium text-stone-700 border border-stone-300 rounded-md hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[40px] px-5 py-2 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 cursor-pointer"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
