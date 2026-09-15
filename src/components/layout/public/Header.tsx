"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    CalendarDays,
    ChevronDown,
    HeartPulse,
    LayoutDashboard,
    LogOut,
    Menu,
    Stethoscope,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profileImage?: string | null;
}

interface HeaderProps {
    user?: CurrentUser | null;
}

const publicNavigation = [
    {
        label: "Find Doctors",
        href: "/doctors",
        icon: Stethoscope,
    },
    {
        label: "How It Works",
        href: "/how-it-works",
    },
    {
        label: "About Us",
        href: "/about",
    },
];

const patientNavigation = [
    {
        label: "Find Doctors",
        href: "/doctors",
        icon: Stethoscope,
    },
    {
        label: "My Appointments",
        href: "/patient/appointments",
        icon: CalendarDays,
    },
];

const doctorNavigation = [
    {
        label: "Doctors",
        href: "/doctors",
        icon: Stethoscope,
    },
    {
        label: "My Schedule",
        href: "/doctor/schedules",
        icon: CalendarDays,
    },
    {
        label: "Appointments",
        href: "/doctor/appointments",
        icon: CalendarDays,
    },
];

const adminNavigation = [
    {
        label: "Doctors",
        href: "/admin/doctors",
        icon: Stethoscope,
    },
    {
        label: "Appointments",
        href: "/admin/appointments",
        icon: CalendarDays,
    },
];

function getNavigation(user?: CurrentUser | null) {
    if (!user) return publicNavigation;

    switch (user.role) {
        case "PATIENT":
            return patientNavigation;

        case "DOCTOR":
            return doctorNavigation;

        case "ADMIN":
        case "SUPER_ADMIN":
            return adminNavigation;

        default:
            return publicNavigation;
    }
}

function getDashboardPath(role: UserRole) {
    switch (role) {
        case "PATIENT":
            return "/patient/dashboard";

        case "DOCTOR":
            return "/doctor/dashboard";

        case "ADMIN":
        case "SUPER_ADMIN":
            return "/admin/dashboard";

        default:
            return "/";
    }
}

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

function isActiveRoute(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ user = null }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = getNavigation(user);

    const isHome = pathname === "/";
    const transparent = isHome && !scrolled;

    const handleLogout = async () => {
        // await logout();

        router.replace("/login");
        router.refresh();
    };

    const handleNavigation = (href: string) => {
        setMobileOpen(false);
        router.push(href);
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-colors duration-300",
                isHome && "-mb-16",
                transparent
                    ? "bg-transparent"
                    : "border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5"
                    aria-label="MediCare home"
                >
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                        <HeartPulse className="size-5" strokeWidth={2.5} />
                    </div>

                    <div className="hidden sm:block">
                        <span
                            className={cn(
                                "text-lg font-bold tracking-tight",
                                transparent && "text-white",
                            )}
                        >
                            MediCare
                        </span>
                        <span
                            className={cn(
                                "ml-1 text-xs font-medium",
                                transparent ? "text-white/75" : "text-muted-foreground",
                            )}
                        >
                            Health
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    className="hidden items-center gap-1 md:flex"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => {
                        const Icon = "icon" in item ? item.icon : null;
                        const active = isActiveRoute(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1 text-sm font-medium transition-colors",
                                    active
                                        ? transparent
                                            ? "bg-white/10 text-white"
                                            : "bg-primary/10 text-primary"
                                        : transparent
                                            ? "text-white/85 hover:bg-white/10 hover:text-white"
                                            : "text-muted-foreground hover:bg-primary hover:text-white",
                                )}
                            >
                                {Icon && <Icon className="size-4" />}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 md:flex">
                    {!user ? (
                        <>
                            <Button
                                variant="ghost"
                                className={cn(
                                    transparent &&
                                        "text-white hover:bg-white/10 hover:text-white",
                                )}
                                asChild
                            >
                                <Link href="/login">Log in</Link>
                            </Button>

                            <Button asChild>
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </>
                    ) : (
                        <UserMenu
                            user={user}
                            onLogout={handleLogout}
                            light={transparent}
                        />
                    )}
                </div>

                {/* Mobile Menu */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "md:hidden",
                                transparent &&
                                    "text-white hover:bg-white/10 hover:text-white",
                            )}
                            aria-label="Open navigation menu"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="flex w-75 flex-col p-0 sm:w-90"
                    >
                        <SheetHeader className="border-b px-6 py-5 text-left">
                            <SheetTitle className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
                                    <HeartPulse className="size-4" />
                                </div>

                                <span>MediCare</span>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-1 flex-col px-4 py-5">
                            {/* Mobile user information */}
                            {user && (
                                <div className="mb-5 flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                                    <Avatar className="size-10">
                                        <AvatarImage
                                            src={user.profileImage ?? undefined}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <nav
                                className="flex flex-col gap-1"
                                aria-label="Mobile navigation"
                            >
                                {navigation.map((item) => {
                                    const Icon = "icon" in item ? item.icon : null;
                                    const active = isActiveRoute(pathname, item.href);

                                    return (
                                        <button
                                            key={item.href}
                                            type="button"
                                            onClick={() => handleNavigation(item.href)}
                                            className={cn(
                                                "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors",
                                                active
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            )}
                                        >
                                            {Icon && <Icon className="size-4" />}
                                            {item.label}
                                        </button>
                                    );
                                })}

                                {user && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleNavigation(getDashboardPath(user.role))
                                        }
                                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        <LayoutDashboard className="size-4" />
                                        Dashboard
                                    </button>
                                )}
                            </nav>

                            <div className="mt-auto border-t pt-5">
                                {!user ? (
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => handleNavigation("/login")}
                                        >
                                            Log in
                                        </Button>

                                        <Button
                                            className="w-full"
                                            onClick={() => handleNavigation("/register")}
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="size-4" />
                                        Log out
                                    </Button>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

/* -------------------------------------------------------------------------- */
/* User Menu                                                                  */
/* -------------------------------------------------------------------------- */

interface UserMenuProps {
    user: CurrentUser;
    onLogout: () => void;
    light?: boolean;
}

function UserMenu({ user, onLogout, light = false }: UserMenuProps) {
    const router = useRouter();

    const dashboardPath = getDashboardPath(user.role);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "h-auto gap-2 rounded-full px-2 py-1.5",
                        light && "text-white hover:bg-white/10",
                    )}
                >
                    <Avatar className="size-8">
                        <AvatarImage
                            src={user.profileImage ?? undefined}
                            alt={user.name}
                        />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>

                    <div className="hidden max-w-30 text-left lg:block">
                        <p
                            className={cn(
                                "truncate text-sm font-medium",
                                light && "text-white",
                            )}
                        >
                            {user.name}
                        </p>
                        <p
                            className={cn(
                                "truncate text-xs capitalize",
                                light ? "text-white/75" : "text-muted-foreground",
                            )}
                        >
                            {user.role.toLowerCase().replace("_", " ")}
                        </p>
                    </div>

                    <ChevronDown
                        className={cn(
                            "size-4",
                            light ? "text-white/75" : "text-muted-foreground",
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="size-9">
                        <AvatarImage
                            src={user.profileImage ?? undefined}
                            alt={user.name}
                        />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push(dashboardPath)}>
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 size-4" />
                    My Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={onLogout}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}