"use client";

import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lineItems,
    itemCount,
    subtotal,
    checkoutUrl,
    removeItem,
    busy,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d9d9d9]">
          <h2 className="font-display font-light text-[#252a38] text-2xl">
            Cart {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            onClick={closeCart}
            className="text-[#656565] hover:text-[#252a38] transition-colors text-xl leading-none"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {lineItems.length === 0 ? (
            <p className="text-[#656565] text-sm mt-4">Your cart is empty.</p>
          ) : (
            lineItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 pb-5 border-b border-[#d9d9d9] last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-[#252a38] text-sm">{item.title}</p>
                  {item.variantTitle && (
                    <p className="text-xs text-[#656565] mt-0.5">{item.variantTitle}</p>
                  )}
                  <p className="text-xs text-[#656565] mt-0.5">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-display font-light text-[#252a38]">{item.price}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={busy}
                    className="text-xs text-[#656565] hover:text-red-500 transition-colors underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lineItems.length > 0 && (
          <div className="px-6 py-5 border-t border-[#d9d9d9] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#656565] text-sm uppercase tracking-widest">Subtotal</span>
              <span className="font-display font-light text-[#252a38] text-xl">{subtotal}</span>
            </div>
            <a
              href={checkoutUrl ?? "#"}
              className="block w-full text-center bg-[#252a38] text-white rounded-full py-3 font-medium tracking-widest uppercase text-sm hover:bg-[#b9ac89] transition-colors duration-300"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
