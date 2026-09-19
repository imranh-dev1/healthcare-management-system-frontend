import RoleGuard from "@/components/auth/role-guard"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import type { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard roles={["SUPER_ADMIN"]}>
            <DashboardShell Role="SUPER_ADMIN">{children}</DashboardShell>
        </RoleGuard>
    )
}