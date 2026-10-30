import "./globals.css";
import { CartProvider } from "../components/cart/CartProvider";
import CartDrawer from "../components/cart/CartDrawer";

export const metadata = {
  title: "Velvet Coffee | Your Daily Ritual",
  description: "Exceptional coffee. Unforgettable moments. Discover the Velvet Coffee signature blends.",
};

export default function RootLayout({ children }) {
  return <html lang="en" className="h-full antialiased"><body className="min-h-full flex flex-col"><CartProvider>{children}<CartDrawer/></CartProvider></body></html>;
}
