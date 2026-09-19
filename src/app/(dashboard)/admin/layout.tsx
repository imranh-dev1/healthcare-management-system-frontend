import type { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>Admin Dash{children}</div>
    )
}