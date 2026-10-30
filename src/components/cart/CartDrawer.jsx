"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, setOpen } = useCart();
  return <button className="cart-trigger" onClick={() => setOpen(true)} aria-label={`Open shopping bag, ${count} items`}><span>BAG</span><span className="cart-count">{count}</span></button>;
}

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, setQuantity, remove } = useCart();
  const [checkoutNotice, setCheckoutNotice] = useState("");
  const drawerRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector("[data-cart-close]")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open, setOpen]);
  if (!open) return null;
  return <div className="cart-layer"><button className="cart-scrim" aria-label="Close shopping bag" onClick={() => setOpen(false)}/><aside ref={drawerRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><header className="cart-heading"><div><p className="eyebrow">THE GOOD STUFF</p><h2 id="cart-title">Your bag <span>({items.reduce((n,item) => n + item.quantity, 0)})</span></h2></div><button className="icon-button" data-cart-close onClick={() => setOpen(false)} aria-label="Close bag"><X/></button></header>
   {items.length === 0 ? <div className="cart-empty"><p>Your bag is taking a quiet moment.</p><Link className="button button-dark" href="/coffee" onClick={() => setOpen(false)}>FIND YOUR COFFEE</Link></div> : <><div className="cart-lines">{items.map(item => <article className="cart-line" key={item.id}><div className="cart-swatch" style={{ "--bean": item.color }}><span>V</span></div><div className="cart-line-info"><Link href={`/coffee/${item.slug}`} onClick={() => setOpen(false)}>{item.name}</Link><small>{item.size} · Whole bean</small><div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => item.quantity === 1 ? remove(item.id) : setQuantity(item.id,item.quantity - 1)}><Minus size={13}/></button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => setQuantity(item.id,item.quantity + 1)}><Plus size={13}/></button></div></div><div className="cart-line-price"><strong>${(item.price * item.quantity).toFixed(2)}</strong><button onClick={() => remove(item.id)}>Remove</button></div></article>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes are not calculated in this demo.</p><button className="button button-dark" onClick={() => setCheckoutNotice("Checkout is a demonstration. No payment or order service is connected.")}>CONTINUE TO CHECKOUT</button>{checkoutNotice && <p role="status" className="form-status">{checkoutNotice}</p>}<Link href="/coffee" onClick={() => setOpen(false)}>Continue exploring</Link></div></>}
  </aside></div>;
}
