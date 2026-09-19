"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import logo from "@/assest/logo.png";
import { cn } from "cn";
import { ADMIN_ROUTES, DOCTOR_ROUTES, PATIENT_ROUTES, SUPER_ADMIN_ROUTES } from "@/routes";
import { UserRole } from "@/types";
import { usePathname } from "next/navigation";

const sidebarRoutes = {
    SUPER_ADMIN: SUPER_ADMIN_ROUTES,
    ADMIN: ADMIN_ROUTES,
    DOCTOR: DOCTOR_ROUTES,
    PATIENT: PATIENT_ROUTES
}

export function DashboardSidebar({ Role }: { Role: UserRole }) {

    const routes = sidebarRoutes[Role]
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarHeader>
                <Link
                    href="/"
                    className="group flex items-center gap-2.5"
                    aria-label="MediCare home"
                >
                    <Image
                        src={logo}
                        alt="MediCare logo"
                        width={50}
                        height={50}
                        priority
                    />

                    <div className="hidden sm:block">
                        <span
                            className={cn(
                                "text-lg font-bold tracking-tight",
                                "text-foreground",
                            )}
                        >
                            MediCare
                        </span>

                        <span
                            className={cn(
                                "ml-1 text-xs font-medium",
                                "text-muted-foreground",
                            )}
                        >
                            Health
                        </span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {routes?.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.url === pathname}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
