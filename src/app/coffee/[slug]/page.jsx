import { notFound } from "next/navigation";
import PageFrame from "../../../components/PageFrame";
import ProductDetail from "../../../components/ProductDetail";
import { products } from "../../../data/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const product = products.find(item => item.slug === slug); return { title: product ? `${product.name} | Velvet Coffee` : "Coffee | Velvet Coffee", description: product?.description }; }
export default async function ProductPage({ params }) { const { slug } = await params; const product = products.find(item => item.slug === slug); if (!product) notFound(); const related = products.filter(item => item.id !== product.id).slice(0,3); return <PageFrame><ProductDetail product={product} related={related}/></PageFrame>; }
