import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>Genaral Dash{children}</div>
    )
}