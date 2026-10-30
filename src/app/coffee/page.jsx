import PageFrame, { PageHero } from "../../components/PageFrame";
import Catalog from "../../components/Catalog";

export const metadata = { title: "Our Coffee | Velvet Coffee", description: "Search, filter and discover the Velvet Coffee signature blends." };
export default function CoffeePage() { return <PageFrame><PageHero eyebrow="SIXTEEN WAYS TO SLOW DOWN" title="Find your" accent="kind of coffee." description="Small-batch roasts selected for character and made for the daily ritual."/><div className="catalog-section"><Catalog/></div></PageFrame>; }
