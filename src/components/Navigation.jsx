"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { CartButton } from "./cart/CartDrawer";

const links = [["Shop Coffee", "/coffee"], ["Collections", "/collections"], ["Best Sellers", "/best-sellers"], ["Our Story", "/story"], ["Why Velvet", "/why-velvet"]];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return undefined;
    document.getElementById("mobile-navigation")?.querySelector("a")?.focus();
    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return <header className="site-header">
    <Link href="/" className="wordmark" onClick={() => setOpen(false)}>VELVET<span>COFFEE</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>
    <div className="nav-account"><Link href="/contact">Contact</Link><Link href="/login">Log in</Link><Link className="nav-join" href="/register">Join us <ArrowRight size={13}/></Link><CartButton/></div>
    <button ref={menuButton} className="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X/> : <Menu/>}</button>
    {open && <nav id="mobile-navigation" className="mobile-drawer" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/about" onClick={() => setOpen(false)}>About Velvet</Link><Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link><Link href="/login" onClick={() => setOpen(false)}>Log in</Link><Link href="/register" onClick={() => setOpen(false)}>Create an account</Link><CartButton/></nav>}
  </header>;
}
