import { Suspense } from "react";
import ActivateAccount from "@/features/auth/ActivateAccount";

export const metadata = {
    title: "Activate Account | EcoTracker",
    description: "Verify your email to activate your account",
};

export default function ActivateAccountPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
            <ActivateAccount />
        </Suspense>
    );
}
