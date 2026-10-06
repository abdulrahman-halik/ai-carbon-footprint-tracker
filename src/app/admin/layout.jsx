import RouteGuard from "@/components/RouteGuard";
import AdminShell from "@/features/admin/AdminShell";

export const metadata = {
    title: "Admin Dashboard | EcoTracker",
    description: "EcoTracker Administrator Console & Impact Analytics",
};

export default function AdminLayout({ children }) {
    return (
        <RouteGuard>
            <AdminShell>{children}</AdminShell>
        </RouteGuard>
    );
}
