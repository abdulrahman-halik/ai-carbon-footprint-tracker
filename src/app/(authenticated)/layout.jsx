import DashboardShell from "@/features/layout/DashboardShell";

export default function AuthenticatedLayout({ children }) {
    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    );
}
