import ForgotPasswordForm from "@/features/auth/ForgotPasswordForm";

export const metadata = {
    title: "Forgot Password | AI Carbon Tracker",
    description: "Reset your password for your account based on your email",
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
