import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductGrid({ products }) {
 return <div className="catalog-grid">{products.map((product, index) => <article className="catalog-product" id={product.slug} key={product.slug}>
   <Link href={`/coffee#${product.slug}`} className={`product-art catalog-art ${product.slug}`} style={{ "--bean": product.color }} aria-label={`See ${product.name}`}><span className="coffee-photo" style={{ backgroundImage: `url("${product.photo}")` }} aria-hidden="true"/><div className="coffee-bag"><span className="bag-mark">V</span><span className="bag-label">VELVET<br/>COFFEE</span><i>WHOLE BEAN · {product.size.toUpperCase()}</i></div><span className="bean bean-one"/><span className="bean bean-two"/><span className="bean bean-three"/><span className="catalog-index">0{index + 1}</span></Link>
   <div className="catalog-data"><div><p className="eyebrow">{product.origin} · {product.roast} ROAST</p><h2>{product.name}</h2><p>{product.description}</p><div className="tasting-notes">{product.note.split(" · ").map(note => <span key={note}>{note}</span>)}</div><div className="intensity" aria-label={`Intensity ${product.intensity} of 5`}>INTENSITY {Array.from({ length: 5 }, (_, i) => <i className={i < product.intensity ? "on" : ""} key={i}/>)}</div><p className="brew-tip">BEST BREWED · {product.brew}</p></div><div className="catalog-price"><strong>${product.price}</strong><span>{product.size}</span><Link href="/contact" className="button button-dark">ASK ABOUT THIS COFFEE <ArrowRight size={14}/></Link></div></div>
  </article>)}</div>;
}
