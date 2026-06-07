"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RouteGuard({ children }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPath = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");
    const isPublicPath = pathname === "/" || pathname.startsWith("/about") || pathname.startsWith("/estimator") || pathname.startsWith("/learn") || pathname.startsWith("/projects");

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            if (!isAuthPath && !isPublicPath) {
                router.push("/login");
            }
            return;
        }

        if (!user.onboarding_completed) {
            if (!isPublicPath && pathname !== "/onboarding") {
                router.push("/onboarding");
            }
            return;
        }

        if (pathname === "/onboarding" || isAuthPath) {
            router.push("/dashboard");
        }
    }, [user, isLoading, pathname, router, isAuthPath, isPublicPath]);

    const isAuthorized = !isLoading && (
        (!user && (isAuthPath || isPublicPath)) ||
        (user && !user.onboarding_completed && (isPublicPath || pathname === "/onboarding")) ||
        (user && user.onboarding_completed && pathname !== "/onboarding" && !isAuthPath)
    );

    // Show loading spinner while loading user or determining auth path
    if (isLoading || !isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
