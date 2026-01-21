import DashboardShell from "@/features/layout/DashboardShell";
import AIChatbot from "@/features/ai/AIChatbot";

export default function AuthenticatedLayout({ children }) {
    return (
        <DashboardShell>
            {children}
            <AIChatbot />
        </DashboardShell>
    );
}
