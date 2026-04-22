"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RouteGuard({ children }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        const isAuthPath = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");
        const isPublicPath = pathname === "/" || pathname.startsWith("/about") || pathname.startsWith("/estimator") || pathname.startsWith("/learn") || pathname.startsWith("/projects");

        // Follow strict route guard logic
        if (!user) {
            if (!isAuthPath && !isPublicPath) {
                setAuthorized(false);
                router.push("/login");
            } else {
                setAuthorized(true);
            }
        } else {
            if (!user.onboarding_completed) {
                if (pathname !== "/onboarding") {
                    setAuthorized(false);
                    router.push("/onboarding");
                } else {
                    setAuthorized(true);
                }
            } else {
                if (pathname === "/onboarding" || isAuthPath || pathname === "/") {
                    setAuthorized(false);
                    router.push("/dashboard");
                } else {
                    setAuthorized(true);
                }
            }
        }
    }, [user, isLoading, pathname, router]);

    // Show loading spinner while loading user or determining auth path
    if (isLoading || !authorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
