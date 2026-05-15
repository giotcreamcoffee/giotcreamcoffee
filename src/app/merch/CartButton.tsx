"use client";

import { useCart } from "./CartContext";

export default function CartButton() {
  const { openCart, itemCount } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative text-white hover:text-[#b9ac89] transition-colors"
      aria-label="Open cart"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#b9ac89] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
          {itemCount}
        </span>
      )}
    </button>
  );
}
