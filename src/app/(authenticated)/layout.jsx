import DashboardShell from "@/features/layout/DashboardShell";
import AIChatbot from "@/features/ai/AIChatbot";
import RouteGuard from "@/components/RouteGuard";

export default function AuthenticatedLayout({ children }) {
    return (
        <RouteGuard>
            <DashboardShell>
                {children}
                <AIChatbot />
            </DashboardShell>
        </RouteGuard>

    );
}
