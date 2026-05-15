"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { shopifyClient } from "@/lib/shopify";

const STORAGE_KEY = "giot_checkout_id";

interface LineItem {
  id: string;
  title: string;
  variantTitle: string | null;
  quantity: number;
  price: string;
}

interface CartCtx {
  lineItems: LineItem[];
  itemCount: number;
  subtotal: string;
  checkoutUrl: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  busy: boolean;
}

const CartContext = createContext<CartCtx | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

function formatPrice(raw: unknown): string {
  if (!raw) return "";
  const amount =
    typeof raw === "object" && raw !== null && "amount" in raw
      ? parseFloat((raw as { amount: string }).amount)
      : parseFloat(raw as string);
  return isNaN(amount) ? "" : `$${amount.toFixed(2)}`;
}

function parseCheckout(checkout: any) {
  return {
    checkoutUrl: checkout.webUrl as string,
    subtotal: formatPrice(checkout.subtotalPrice),
    lineItems: ((checkout.lineItems as any[]) ?? []).map((item) => ({
      id: item.id as string,
      title: item.title as string,
      variantTitle:
        item.variant?.title && item.variant.title !== "Default Title"
          ? (item.variant.title as string)
          : null,
      quantity: item.quantity as number,
      price: formatPrice(item.variant?.price),
    })),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [subtotal, setSubtotal] = useState("$0.00");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const apply = useCallback((checkout: any) => {
    const parsed = parseCheckout(checkout);
    setCheckoutId(checkout.id);
    setLineItems(parsed.lineItems);
    setSubtotal(parsed.subtotal);
    setCheckoutUrl(parsed.checkoutUrl);
    localStorage.setItem(STORAGE_KEY, checkout.id);
  }, []);

  useEffect(() => {
    async function init() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const co = await shopifyClient.checkout.fetch(saved);
          if (co && !(co as any).completedAt) {
            apply(co);
            return;
          }
        } catch {}
      }
      apply(await shopifyClient.checkout.create());
    }
    init();
  }, [apply]);

  const addToCart = useCallback(
    async (variantId: string, quantity: number) => {
      if (!checkoutId) return;
      setBusy(true);
      const co = await shopifyClient.checkout.addLineItems(checkoutId, [
        { variantId, quantity },
      ]);
      apply(co);
      setBusy(false);
      setIsOpen(true);
    },
    [checkoutId, apply]
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      if (!checkoutId) return;
      setBusy(true);
      const co = await shopifyClient.checkout.removeLineItems(checkoutId, [
        lineItemId,
      ]);
      apply(co);
      setBusy(false);
    },
    [checkoutId, apply]
  );

  const itemCount = lineItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lineItems,
        itemCount,
        subtotal,
        checkoutUrl,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeItem,
        busy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
