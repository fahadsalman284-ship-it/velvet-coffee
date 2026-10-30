import AccountPage from "../../components/AccountPage";
export const metadata = { title: "Log in | Velvet Coffee", description: "Log in to your Velvet Coffee account.", robots: { index: false, follow: false } };
export default function LoginPage() { return <AccountPage mode="login"/>; }
