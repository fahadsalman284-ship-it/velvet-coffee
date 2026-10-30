"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "./cart/CartProvider";

const roasts = ["Light", "Medium", "Medium-dark", "Dark"];
const types = ["Whole bean", "Espresso", "Ground", "Decaf", "Flavored"];

function ProductTile({ product }) {
 const { add } = useCart();
 return <article className="shop-card">
   <Link href={`/coffee/${product.slug}`} className={`shop-art product-art ${product.slug}`} style={{ "--bean": product.color }} aria-label={`View ${product.name}`}><span className="coffee-photo" style={{ backgroundImage: `url("${product.photo}")` }} aria-hidden="true"/><div className="coffee-bag"><span className="bag-mark">V</span><span className="bag-label">VELVET<br/>COFFEE</span><i>WHOLE BEAN · {product.size.toUpperCase()}</i></div><span className="bean bean-one"/><span className="bean bean-two"/><span className="shop-roast">{product.roast.toUpperCase()}</span></Link>
   <div className="shop-card-info"><div className="shop-title-row"><div><p className="eyebrow">{product.origin}</p><h2><Link href={`/coffee/${product.slug}`}>{product.name}</Link></h2></div><strong>${product.price}</strong></div><p className="shop-notes">{product.note}</p><div className="shop-card-actions"><Link className="product-link" href={`/coffee/${product.slug}`}>DETAILS <ArrowRight size={14}/></Link><button className="add-button" onClick={() => add(product)}>ADD TO BAG <span>+</span></button></div></div>
  </article>;
}

export default function Catalog({ view = "all" }) {
 const [search, setSearch] = useState(""); const [roast, setRoast] = useState("all"); const [type, setType] = useState("all");
 const [minPrice, setMinPrice] = useState(0); const [maxPrice, setMaxPrice] = useState(40); const [featured, setFeatured] = useState(false); const [available, setAvailable] = useState(false); const [sort, setSort] = useState(view === "popular" ? "popular" : "featured"); const [mobileFilters, setMobileFilters] = useState(false);
 const filtered = useMemo(() => {
   let result = products.filter(p => (view !== "popular" || p.popularity >= 75)
    && (!search || `${p.name} ${p.note} ${p.origin} ${p.roast} ${p.type}`.toLowerCase().includes(search.toLowerCase()))
    && (roast === "all" || p.roast === roast) && (type === "all" || p.type === type)
    && p.price >= Number(minPrice || 0) && p.price <= Number(maxPrice || 1000)
    && (!featured || p.featured) && (!available || p.available));
   if (sort === "popular") result.sort((a,b) => b.popularity - a.popularity);
   if (sort === "price-asc") result.sort((a,b) => a.price - b.price);
   if (sort === "price-desc") result.sort((a,b) => b.price - a.price);
   if (sort === "name") result.sort((a,b) => a.name.localeCompare(b.name));
   if (sort === "featured") result.sort((a,b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity);
   return result;
 }, [view,search,roast,type,minPrice,maxPrice,featured,available,sort]);
 useEffect(() => {
   const frame = window.requestAnimationFrame(() => {
     const params = new URLSearchParams(window.location.search);
     const roastParam = params.get("roast"); const typeParam = params.get("type"); const searchParam = params.get("q");
     if (roasts.includes(roastParam)) setRoast(roastParam);
     if (types.includes(typeParam)) setType(typeParam);
     if (searchParam) setSearch(searchParam);
   });
   return () => window.cancelAnimationFrame(frame);
 }, []);
 function reset() { setSearch(""); setRoast("all"); setType("all"); setMinPrice(0); setMaxPrice(40); setFeatured(false); setAvailable(false); setSort(view === "popular" ? "popular" : "featured"); }
 return <section className="catalog-browser" aria-label="Coffee catalogue">
   <div className="catalog-toolbar"><label className="catalog-search"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coffee, tasting notes, origin" aria-label="Search coffees"/></label><div className="catalog-sort"><span>{filtered.length} COFFEES</span><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="popular">Most popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div><button className="filter-toggle" onClick={() => setMobileFilters(v => !v)} aria-expanded={mobileFilters}><SlidersHorizontal size={15}/> Filters</button></div>
   <div className="catalog-layout"><aside className={`filter-panel${mobileFilters ? " is-open" : ""}`} aria-label="Coffee filters"><div className="filter-head"><h2>Refine</h2><button onClick={reset}><RotateCcw size={13}/> Reset</button></div><fieldset><legend>Price range</legend><div className="price-fields"><label><span>Min $</span><input type="number" min="0" max="40" value={minPrice} onChange={e => setMinPrice(e.target.value)} aria-label="Minimum price"/></label><span>to</span><label><span>Max $</span><input type="number" min="0" max="100" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} aria-label="Maximum price"/></label></div></fieldset><fieldset><legend>Roast level</legend><label className="filter-option"><input type="radio" name="roast" checked={roast === "all"} onChange={() => setRoast("all")}/> All roasts</label>{roasts.map(value => <label className="filter-option" key={value}><input type="radio" name="roast" checked={roast === value} onChange={() => setRoast(value)}/>{value}</label>)}</fieldset><fieldset><legend>Coffee type</legend><select className="filter-select" value={type} onChange={e => setType(e.target.value)} aria-label="Coffee type"><option value="all">All coffee types</option>{types.map(value => <option key={value}>{value}</option>)}</select></fieldset><fieldset><legend>Availability</legend><label className="filter-option"><input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)}/> Available now</label><label className="filter-option"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)}/> Featured blends</label></fieldset><button className="button button-dark filter-apply" onClick={() => setMobileFilters(false)}>SHOW {filtered.length} COFFEES</button></aside>
    <div className="catalog-results">{filtered.length ? <div className="shop-grid">{filtered.map(product => <ProductTile product={product} key={product.id}/>)}</div> : <div className="empty-results"><p className="eyebrow">NO MATCHES JUST YET</p><h2>Try a different blend of filters.</h2><button className="button button-dark" onClick={reset}>RESET FILTERS</button></div>}</div></div>
   {view === "popular" && <p className="demo-note">Popularity is an editorial demonstration ranking, not sales or customer data.</p>}
  </section>;
}
