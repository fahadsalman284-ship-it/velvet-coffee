"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const KEY = "velvet-coffee-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try { const stored = JSON.parse(window.localStorage.getItem(KEY) || "[]"); if (Array.isArray(stored)) setItems(stored); }
      catch { try { window.localStorage.removeItem(KEY); } catch { /* Storage may be disabled. */ } }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (ready) { try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* Cart still works for this visit if storage is unavailable. */ } } }, [items, ready]);
  function add(product, quantity = 1) {
    setItems(current => {
      const exists = current.find(item => item.id === product.id);
      if (exists) return current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { id: product.id, slug: product.slug, name: product.name, price: product.price, size: product.size, color: product.color, quantity }];
    });
    setOpen(true);
  }
  function setQuantity(id, quantity) { setItems(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)); }
  function remove(id) { setItems(current => current.filter(item => item.id !== id)); }
  const value = useMemo(() => ({ items, count: items.reduce((sum,item) => sum + item.quantity, 0), subtotal: items.reduce((sum,item) => sum + item.price * item.quantity, 0), open, setOpen, add, setQuantity, remove }), [items, open]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used within CartProvider"); return context; }
