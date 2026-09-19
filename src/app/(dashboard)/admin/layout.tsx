import RoleGuard from "@/components/auth/role-guard"
import type { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard roles={["ADMIN", "PATIENT"]}>{children}</RoleGuard>
    )
}