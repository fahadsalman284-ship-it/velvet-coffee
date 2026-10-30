import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageFrame, { PageHero } from "../../components/PageFrame";
export const metadata = { title: "Collections | Velvet Coffee", description: "Explore Velvet Coffee collections by mood, moment and the tasting notes you love." };
const collections = [
 ["01","The house favorites","A considered place to start.","/best-sellers","#73523d"],
 ["02","Espresso collection","Full-bodied blends for a slower shot.","/coffee?type=Espresso","#3d271c"],
 ["03","Dark & deep","Roasts with a little more presence.","/coffee?roast=Dark","#241711"],
 ["04","Smooth & mild","Easygoing cups with a soft finish.","/coffee?roast=Light","#b28d68"],
 ["05","Flavored coffees","Familiar notes, thoughtfully balanced.","/coffee?type=Flavored","#a36e49"],
 ["06","Decaf, after hours","A gentle cup for a quieter evening.","/coffee?type=Decaf","#594031"],
];
export default function CollectionsPage() { return <PageFrame><PageHero eyebrow="A COLLECTION FOR EVERY KIND OF MOMENT" title="Find your" accent="next favorite." description="Explore by mood, moment or the notes you love."/><section className="collection-grid">{collections.map(([n,title,copy,href,color]) => <Link href={href} key={n} className="collection-card" style={{"--collection":color}}><span>{n} / VELVET EDIT</span><div className="collection-mark">V</div><h2>{title}</h2><p>{copy}</p><b>EXPLORE <ArrowRight size={14}/></b></Link>)}</section></PageFrame>; }
