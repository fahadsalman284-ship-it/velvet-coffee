"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Navigation from "./Navigation";
import { Footer } from "./PageFrame";
import { products } from "../data/products";

const CoffeeScene = dynamic(() => import("./CoffeeScene"), { ssr: false, loading: () => <div className="scene-fallback" aria-label="A sculptural ceramic coffee cup"/> });

function ProductCard({ product }) {
  return <article className="product-card"><span className="product-number">{product.origin} / {product.roast.toUpperCase()}</span><Link href={`/coffee#${product.slug}`} className={`product-art ${product.slug}`} style={{ "--bean": product.color }} aria-label={`Discover ${product.name}`}><span className="coffee-photo" style={{ backgroundImage: `url("${product.photo}")` }} aria-hidden="true"/><div className="coffee-bag"><span className="bag-mark">V</span><span className="bag-label">VELVET<br/>COFFEE</span><i>WHOLE BEAN · {product.size.toUpperCase()}</i></div><span className="bean bean-one"/><span className="bean bean-two"/><span className="bean bean-three"/></Link><div className="product-meta"><div><h3>{product.name}</h3><p>{product.note}</p></div><span>${product.price}</span></div><Link href={`/coffee#${product.slug}`} className="product-link">DISCOVER BLEND <ArrowRight size={14}/></Link></article>;
}

export default function Site() {
 const root = useRef(null);
 useEffect(() => {
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
   let ctx; let alive = true;
   import("gsap").then(async ({ gsap }) => {
     const { ScrollTrigger } = await import("gsap/ScrollTrigger");
     if (!alive) return;
     gsap.registerPlugin(ScrollTrigger);
     ctx = gsap.context(() => {
       gsap.from(".hero-copy > *", { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.15 });
       gsap.from(".hero-scene", { opacity: 0, scale: 0.94, duration: 1.3, ease: "power2.out" });
       gsap.utils.toArray(".reveal").forEach((el) => gsap.from(el, { y: 28, opacity: 0, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%", once: true } }));
       gsap.to(".hero-scene", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });
     }, root);
   });
   return () => { alive = false; ctx?.revert(); };
 }, []);

 return <main ref={root}>
   <Navigation/>
  <section className="hero" id="home"><div className="hero-inner"><div className="hero-copy"><p className="eyebrow"><span/> A WORLD OF COFFEE, RECONSIDERED</p><h1>NOT JUST COFFEE.<br/><em>AN ENTIRE EXPERIENCE.</em></h1><p className="hero-description">Discover exceptional beans, extraordinary flavour, and a ritual worth slowing down for.</p><div className="hero-actions"><Link className="button button-light" href="/coffee">DISCOVER OUR COFFEE <ArrowRight size={15}/></Link><a className="text-link" href="#journey">EXPLORE THE EXPERIENCE <span>↘</span></a></div></div><div className="hero-scene"><div className="scene-glow"/><CoffeeScene/><span className="scene-caption">01 — THE MORNING POUR</span></div><div className="hero-index">SMALL BATCH <span>—</span> SLOW MOMENTS</div></div><a className="scroll-cue" href="#journey"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a><div className="hero-side">SOURCED WITH INTENTION · ROASTED WITH CARE</div></section>
  <section className="intro-band"><p className="eyebrow reveal">A MORE CONSIDERED CUP</p><p className="intro-line reveal">Good coffee asks you to <em>slow down.</em><br/>We made it worth the pause.</p><span className="intro-asterisk">✳</span></section>
  <section className="journey section-pad" id="journey"><div className="journey-heading reveal"><p className="eyebrow">FROM FIRST CRACK TO FINAL POUR</p><h2>A LITTLE CLOSER<br/>TO <em>THE GOOD STUFF.</em></h2><p>Every cup carries a journey. Take a moment to follow it.</p></div><div className="journey-grid"><article className="journey-step reveal"><span>01 / ORIGIN</span><div className="journey-visual journey-bean"><i/><b/><small>01</small></div><h3>It starts with a bean.</h3><p>We build relationships with growers and choose lots for their character, not just their label.</p></article><article className="journey-step reveal"><span>02 / ROAST</span><div className="journey-visual journey-roast"><i/><b/><small>02</small></div><h3>Heat, held gently.</h3><p>Roasted in small batches. We follow each coffee’s natural rhythm and bring out its best.</p></article><article className="journey-step reveal"><span>03 / BREW</span><div className="journey-visual journey-brew"><i/><b/><small>03</small></div><h3>Make a moment.</h3><p>Freshly ground and brewed your way. The ritual is yours to make.</p></article></div></section>
  <section className="blends section-pad" id="blends"><div className="section-heading reveal"><div><p className="eyebrow">A FEW HOUSE FAVORITES</p><h2>MEET YOUR<br/><em>NEW REGULAR.</em></h2></div><Link className="text-link dark-link" href="/coffee">ALL OUR COFFEE <ArrowRight size={15}/></Link></div><div className="product-grid">{products.slice(0,3).map((product) => <ProductCard key={product.slug} product={product}/>)}</div></section>
  <section className="craft section-pad" id="craft"><div className="craft-copy reveal"><p className="eyebrow"><span/> THE LONG WAY, ALWAYS</p><h2>CRAFTED<br/>WITH <em>PATIENCE.</em></h2><p className="craft-intro">From a careful harvest to the last slow pour, we leave room for every coffee to become itself.</p><Link href="/why-velvet" className="button button-outline">HOW WE MAKE IT <ArrowRight size={15}/></Link></div><div className="craft-steps"><article className="craft-step reveal"><span>01 / ROAST</span><div className="step-rule"/><h3>Heat, held gently.</h3><p>Small batches, slow curves. We bring out the character that was already there.</p></article><article className="craft-step reveal"><span>02 / GRIND</span><div className="step-rule"/><h3>Fresh, every time.</h3><p>Ground just before the water hits. A little extra care makes all the difference.</p></article><article className="craft-step reveal"><span>03 / BREW</span><div className="step-rule"/><h3>Make a moment.</h3><p>Your favorite cup, your favorite chair. The ritual is yours to make.</p></article></div><div className="craft-deco">SLOW<br/>DOWN</div></section>
  <section className="story section-pad" id="story"><div className="story-image reveal"><div className="story-still"><div className="still-sun"/><div className="still-cup"><div/></div><span>FIELD NOTES — ORIGIN, WITH CARE</span></div><div className="story-image-caption">GOOD COFFEE CONNECTS US</div></div><div className="story-copy reveal"><p className="eyebrow">A NOTE FROM US</p><h2>MORE THAN<br/>A <em>CUP.</em></h2><p>We believe the best coffee begins long before it reaches your kitchen. It starts with the people who grow it, the land that gives it life, and the care carried through every hand.</p><p>We partner with farms we know by name, pay fairly, and roast each harvest to let its truest self shine through. Nothing hurried. Nothing hidden.</p><Link className="text-link dark-link" href="/story">A LITTLE MORE ABOUT US <ArrowRight size={15}/></Link></div></section>
  <section className="why-band section-pad"><div className="why-copy reveal"><p className="eyebrow">THE VELVET DIFFERENCE</p><h2>CARE YOU CAN<br/><em>TASTE.</em></h2><p>Thoughtful sourcing. Fresh, considered roasting. A better cup starts long before the kettle.</p><Link href="/why-velvet" className="text-link dark-link">WHY VELVET <ArrowRight size={15}/></Link></div><div className="quote-card reveal"><span>“</span><blockquote>The first sip is lovely. The quiet it gives you is the real luxury.</blockquote><small>A NOTE FROM A VELVET REGULAR</small></div></section>
  <section className="closing" id="contact"><div className="closing-ring">V<span>✳</span></div><p className="eyebrow">THE GOOD PART STARTS HERE</p><h2>MAKE EVERY SIP<br/><em>MATTER.</em></h2><Link className="button button-light" href="/coffee">EXPLORE OUR BLENDS <ArrowRight size={15}/></Link><div className="closing-grain"/></section><Footer/>
 </main>;
}
