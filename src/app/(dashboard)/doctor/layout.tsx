import RoleGuard from "@/components/auth/role-guard"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import type { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard roles={["DOCTOR"]}>
            <DashboardShell Role="DOCTOR">{children}</DashboardShell>
        </RoleGuard>
    )
}