"use client";

import { useEffect, useRef, useState } from "react";
import { shopifyClient } from "@/lib/shopify";
import { useCart } from "./CartContext";

interface Props {
  productId: string;
  sizes?: string[];
  colors?: string[];
}

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-[#d9d9d9] rounded-full px-4 py-2 text-base md:text-[13px] text-left flex items-center justify-between text-[#252a38] bg-white focus:outline-none focus:border-[#252a38] transition-colors"
      >
        <span className={value ? "text-[#252a38]" : "text-[#aaa]"}>
          {value ?? label}
        </span>
        <span className="text-[10px] text-[#252a38]">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#d9d9d9] rounded-2xl shadow-lg z-20 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#f5f5f3] ${
                value === opt ? "font-medium text-[#252a38]" : "text-[#252a38]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AddToCart({ productId, sizes = [], colors = [] }: Props) {
  const { addToCart, busy } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length === 1 ? sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors.length === 1 ? colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdd =
    (sizes.length === 0 || selectedSize) &&
    (colors.length === 0 || selectedColor);

  async function handleAddToCart() {
    if (!canAdd || loading || busy) return;
    setLoading(true);
    setError(null);

    try {
      const product = await shopifyClient.product.fetch(
        `gid://shopify/Product/${productId}`
      );

      const variants = product.variants as any[];

      const variant = variants.find((v) => {
        const opts = v.selectedOptions as { name: string; value: string }[];
        const sizeOk =
          sizes.length === 0 ||
          opts.some((o) => o.name.toLowerCase() === "size" && o.value === selectedSize);
        const colorOk =
          colors.length === 0 ||
          opts.some((o) => o.name.toLowerCase() === "color" && o.value === selectedColor);
        return sizeOk && colorOk;
      });

      if (!variant) {
        setError("Selected option unavailable.");
        setLoading(false);
        return;
      }

      await addToCart(variant.id as string, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 md:mt-5 space-y-2">
      {sizes.length > 1 && (
        <Dropdown
          label="Size"
          options={sizes}
          value={selectedSize}
          onChange={setSelectedSize}
        />
      )}

      {colors.length > 1 && (
        <Dropdown
          label="Color"
          options={colors}
          value={selectedColor}
          onChange={setSelectedColor}
        />
      )}

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-8 border border-[#d9d9d9] rounded-full flex items-center justify-center text-[#252a38] hover:border-[#252a38] transition-colors text-sm"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-8 h-8 border border-[#d9d9d9] rounded-full flex items-center justify-center text-[#252a38] hover:border-[#252a38] transition-colors text-sm"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={!canAdd || loading || busy}
        className={`w-full border rounded-full py-2 md:py-2.5 font-display font-light leading-none transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer tracking-widest uppercase ${
          added
            ? "bg-[#b9ac89] border-[#b9ac89] text-white"
            : "border-[#252a38] text-[#252a38] hover:bg-[#252a38] hover:text-white"
        }`}
        style={{ fontSize: "clamp(0.6rem, 2vw, 0.875rem)" }}
      >
        {loading ? "Adding…" : added ? "Added ✓" : "Add to Cart"}
      </button>

      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
    </div>
  );
}
