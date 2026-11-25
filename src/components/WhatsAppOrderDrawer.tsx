import React, { useState } from 'react';
import {
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import { MenuItem, OrderCartItem } from '../types/restaurant';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  whatsappNumber: string;
  currencySymbol: string;
  menu: MenuItem[];
  cart: OrderCartItem[];
  onUpdateQuantity: (menuItemId: string, delta: number) => void;
  onClearCart: () => void;
  onConfigureWhatsApp: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  brandName,
  whatsappNumber,
  currencySymbol,
  menu,
  cart,
  onUpdateQuantity,
  onClearCart,
  onConfigureWhatsApp,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'Pickup' | 'Delivery'>('Pickup');
  const [orderNote, setOrderNote] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const resolvedItems = cart
    .map((entry) => {
      const dish = menu.find((m) => m.id === entry.menuItemId);
      return dish ? { dish, quantity: entry.quantity } : null;
    })
    .filter((x): x is { dish: MenuItem; quantity: number } => x !== null);

  const subtotal = resolvedItems.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const cleanDigits = whatsappNumber.replace(/[^\d]/g, '');
  const hasRealWhatsApp = cleanDigits.length >= 7;

  const buildOrderMessage = () => {
    const lines = [
      `Hello ${brandName}, I would like to place an order:`,
      '',
      ...resolvedItems.map(
        ({ dish, quantity }) =>
          `- ${quantity}x ${dish.name} (${currencySymbol}${(
            dish.price * quantity
          ).toFixed(2)})`
      ),
      '',
      `Estimated Subtotal: ${currencySymbol}${subtotal.toFixed(2)}`,
      `Order Type: ${fulfillmentType}`,
      customerName.trim() ? `Name: ${customerName.trim()}` : '',
      orderNote.trim() ? `Notes: ${orderNote.trim()}` : '',
    ].filter(Boolean);

    return lines.join('\n');
  };

  const orderMessage = buildOrderMessage();
  const whatsappUrl = hasRealWhatsApp
    ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(orderMessage)}`
    : null;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col border-l border-stone-200 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-[#7A5B21]" aria-hidden="true" />
            <h2 id="whatsapp-drawer-title" className="font-display text-2xl font-semibold text-[#141518]">
              WhatsApp Order
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close WhatsApp order drawer"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-stone-500 hover:text-[#141518] hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!hasRealWhatsApp && (
            <div className="p-4 rounded-md bg-white border border-stone-300 text-xs sm:text-sm text-stone-700 space-y-2.5">
              <p>
                <strong>Editable WhatsApp Placeholder:</strong> No restaurant WhatsApp number is configured yet. Enter a real WhatsApp number in the Customizer to activate direct send.
              </p>
              <button
                type="button"
                onClick={onConfigureWhatsApp}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A5B21] hover:underline cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Set Client WhatsApp Number</span>
              </button>
            </div>
          )}

          {resolvedItems.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg border border-stone-200 px-6">
              <p className="font-display text-2xl font-semibold text-[#141518] mb-2">
                Your order bag is empty
              </p>
              <p className="text-sm text-stone-600 mb-5">
                Select dishes from the menu to compose an itemized WhatsApp order message.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-sm font-medium bg-[#141518] text-white rounded-md hover:bg-stone-800"
              >
                Browse Menu
              </a>
            </div>
          ) : (
            <>
              {/* Line items */}
              <div className="bg-white rounded-lg border border-stone-200 divide-y divide-stone-100">
                {resolvedItems.map(({ dish, quantity }) => (
                  <div key={dish.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#141518] truncate">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-stone-500 tabular-nums mt-0.5">
                        {currencySymbol}
                        {dish.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="inline-flex items-center border border-stone-300 rounded-md">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(dish.id, -1)}
                          aria-label={`Remove one ${dish.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#141518] hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(dish.id, 1)}
                          aria-label={`Add one ${dish.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#141518] hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#141518] tabular-nums w-16 text-right">
                        {currencySymbol}
                        {(dish.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order preferences */}
              <div className="bg-white rounded-lg border border-stone-200 p-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-md">
                    {(['Pickup', 'Delivery'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFulfillmentType(type)}
                        className={`min-h-[36px] text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                          fulfillmentType === type
                            ? 'bg-white text-[#141518] shadow-xs'
                            : 'text-stone-600 hover:text-[#141518]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="wa-customer-name" className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="wa-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Optional guest name"
                    className="w-full min-h-[40px] px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>

                <div>
                  <label htmlFor="wa-order-note" className="block text-xs font-semibold text-stone-700 mb-1">
                    Dietary Notes or Delivery Instructions
                  </label>
                  <textarea
                    id="wa-order-note"
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Allergies, preferred pickup time, or address..."
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-2 focus:outline-[#7A5B21]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {resolvedItems.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-3">
            <div className="flex items-baseline justify-between text-base font-semibold text-[#141518]">
              <span>Estimated Subtotal</span>
              <span className="tabular-nums text-lg text-[#7A5B21]">
                {currencySymbol}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              No online payment is processed here; your order is confirmed directly via WhatsApp.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF63]" />
                  <span>Send Order on WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold bg-[#141518] text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF63]" />
                      <span>Order Message Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D4AF63]" />
                      <span>Copy WhatsApp Message</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClearCart}
                aria-label="Clear order items"
                title="Clear order"
                className="min-h-[44px] w-11 inline-flex items-center justify-center border border-stone-300 rounded-md text-stone-600 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
