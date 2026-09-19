import RoleGuard from "@/components/auth/role-guard"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import type { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard roles={["PATIENT"]}>
            <DashboardShell Role="PATIENT">{children}</DashboardShell>
        </RoleGuard>
    )
}