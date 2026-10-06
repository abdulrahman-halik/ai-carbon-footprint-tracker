"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RouteGuard({ children }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPath = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password") || pathname.startsWith("/activate-account");
    const isPublicPath = pathname === "/" || pathname.startsWith("/about") || pathname.startsWith("/estimator") || pathname.startsWith("/learn") || pathname.startsWith("/projects");
    const isAdminPath = pathname.startsWith("/admin");

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            if (!isAuthPath && !isPublicPath) {
                router.push("/login");
            }
            return;
        }

        // Restrict /admin to admin role only
        if (isAdminPath && user.role !== "admin") {
            router.push("/dashboard");
            return;
        }

        // If admin navigates to onboarding
        if (user.role === "admin" && pathname === "/onboarding") {
            router.push("/admin/users");
            return;
        }
    }, [user, isLoading, pathname, router, isAuthPath, isPublicPath, isAdminPath]);

    const isAuthorized = !isLoading && (
        (!user && (isAuthPath || isPublicPath)) ||
        (user && user.role === "admin" && !isAuthPath) ||
        (user && user.role !== "admin" && !user.onboarding_completed && (isPublicPath || pathname === "/onboarding")) ||
        (user && user.role !== "admin" && user.onboarding_completed && pathname !== "/onboarding" && !isAuthPath && !isAdminPath)
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
