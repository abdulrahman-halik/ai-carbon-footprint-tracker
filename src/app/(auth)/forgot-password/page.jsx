import { Suspense } from "react";
import ForgotPasswordForm from "@/features/auth/ForgotPasswordForm";

export const metadata = {
    title: "Forgot Password | AI Carbon Tracker",
    description: "Reset your password for your account based on your email",
};

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
            <ForgotPasswordForm />
        </Suspense>
    );
}
