import Link from "next/link";
import Navigation from "./Navigation";
import { ArrowRight } from "lucide-react";

const socialProfiles = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, path: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r=".8" fill="currentColor" stroke="none"/></> },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL, path: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z"/> },
  { label: "X", href: process.env.NEXT_PUBLIC_X_URL, path: <path d="M5 4h4l10 16h-4L5 4Zm0 16 6-7m2-2 6-7"/> },
];

function SocialLinks() {
 return <div className="social-links" aria-label="Social profiles">{socialProfiles.map(({label,href,path}) => href ? <a className={`social-link social-${label.toLowerCase()}`} href={href} key={label} aria-label={label} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true">{path}</svg></a> : <span className={`social-link social-${label.toLowerCase()} is-unconfigured`} key={label} role="img" aria-label={`${label} profile not configured`} title={`${label} profile not configured`}><svg viewBox="0 0 24 24" aria-hidden="true">{path}</svg></span>)}</div>;
}

export function Footer() {
 return <footer className="footer"><div className="footer-brand"><Link href="/" className="wordmark">VELVET<span>COFFEE</span></Link><p>Thoughtful coffee for slower moments.</p><SocialLinks/></div><div className="footer-column"><h2>EXPLORE</h2><Link href="/coffee">Shop coffee</Link><Link href="/collections">Collections</Link><Link href="/best-sellers">Best sellers</Link><Link href="/experience">The experience</Link></div><div className="footer-column"><h2>THE BRAND</h2><Link href="/about">About Velvet</Link><Link href="/story">Our story</Link><Link href="/why-velvet">Why Velvet</Link><Link href="/faq">Coffee FAQ</Link></div><div className="footer-column"><h2>HERE TO HELP</h2><Link href="/contact">Contact</Link><Link href="/login">Your account</Link><p>Customer details are not collected in this demo.</p></div><div className="footer-bottom"><span>© 2026 VELVET COFFEE CO.</span><span>GOOD THINGS TAKE TIME.</span></div></footer>;
}

export default function PageFrame({ children, dark = false }) {
 return <main className={`page-frame${dark ? " page-frame-dark" : ""}`}><Navigation/>{children}<Footer/></main>;
}

export function PageHero({ eyebrow, title, accent, description }) {
 return <section className="page-hero"><p className="eyebrow"><span/> {eyebrow}</p><h1>{title}<br/><em>{accent}</em></h1>{description && <p className="page-hero-copy">{description}</p>}</section>;
}

export function Callout({ title = "Make every sip matter.", href = "/coffee", label = "Explore our coffee" }) {
 return <section className="page-callout"><p className="eyebrow">A BETTER DAILY RITUAL</p><h2>{title}</h2><Link className="button button-light" href={href}>{label} <ArrowRight size={15}/></Link></section>;
}
