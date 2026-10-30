import AccountPage from "../../components/AccountPage";
export const metadata = { title: "Reset password | Velvet Coffee", description: "Start the password reset process for your Velvet Coffee account.", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <AccountPage mode="forgot-password"/>; }
