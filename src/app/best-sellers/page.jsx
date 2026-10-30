import PageFrame, { PageHero } from "../../components/PageFrame";
import Catalog from "../../components/Catalog";
export const metadata = { title: "Best Sellers | Velvet Coffee", description: "Explore Velvet Coffee's most-loved editorial picks." };
export default function BestSellersPage() { return <PageFrame><PageHero eyebrow="THE HOUSE FAVORITES" title="A good place" accent="to begin." description="A curated list of standout blends. The ranking is editorial, not sales data."/><div className="catalog-section"><Catalog view="popular"/></div></PageFrame>; }
