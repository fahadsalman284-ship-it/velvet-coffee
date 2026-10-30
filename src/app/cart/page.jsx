"use client";

import Link from "next/link";
import PageFrame, { PageHero } from "../../components/PageFrame";

import { useCart } from "../../components/cart/CartProvider";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

function CartContents() {
 const { items, subtotal, setQuantity, remove } = useCart();
 const [notice, setNotice] = useState("");
 if (!items.length) return <div className="cart-page-empty"><p>Your bag is empty for now.</p><Link href="/coffee" className="button button-dark">EXPLORE OUR COFFEE</Link></div>;
 return <div className="cart-page-layout"><div className="cart-page-items">{items.map(item => <article className="cart-page-line" key={item.id}><div className="cart-swatch" style={{"--bean":item.color}}>V</div><div className="cart-page-info"><Link href={`/coffee/${item.slug}`}>{item.name}</Link><span>{item.size} · Whole bean</span><div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => item.quantity === 1 ? remove(item.id) : setQuantity(item.id,item.quantity-1)}><Minus size={13}/></button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => setQuantity(item.id,item.quantity+1)}><Plus size={13}/></button></div></div><strong>${(item.price*item.quantity).toFixed(2)}</strong><button className="icon-button" aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)}><X size={16}/></button></article>)}</div><aside className="cart-page-summary"><p className="eyebrow">A LITTLE CHECK-IN</p><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes are not calculated here. Checkout is not connected to a payment or order service.</p><button className="button button-dark" onClick={() => setNotice("Checkout is a demonstration. No payment or order service is connected.")}>CHECKOUT DEMO</button>{notice && <p className="form-status" role="status">{notice}</p>}<Link href="/coffee">Continue shopping</Link></aside></div>;
}

export default function CartPage() { return <PageFrame><PageHero eyebrow="YOUR COFFEE, GATHERED" title="The" accent="shopping bag."/><section className="cart-page-section"><CartContents/></section></PageFrame>; }
