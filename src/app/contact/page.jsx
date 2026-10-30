import { Mail } from "lucide-react";
import PageFrame, { PageHero } from "../../components/PageFrame";
import { ContactForm } from "../../components/Forms";

export const metadata = { title: "Contact | Velvet Coffee", description: "Get in touch with Velvet Coffee about our blends, brewing or the brand." };
export default function ContactPage() { return <PageFrame><PageHero eyebrow="WE’RE HERE FOR A GOOD CONVERSATION" title="Drop us" accent="a note." description="Questions about a coffee, a brew, or just want to say hello? We’d love to hear from you."/><section className="form-page contact-page"><div className="contact-note"><Mail size={20}/><p className="eyebrow">A NOTE IS A GOOD PLACE TO START</p><p>Use the form and leave us a little context. We don’t publish contact details until a dedicated customer-care channel is configured.</p><span>Message delivery requires a connected backend.</span></div><ContactForm/></section></PageFrame>; }
