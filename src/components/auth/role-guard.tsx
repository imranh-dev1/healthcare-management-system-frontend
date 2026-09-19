"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import { AccessDenied } from "./access-denied";

interface IProps {
    children: ReactNode;
    roles: UserRole[]
}

export default function RoleGuard({ children, roles }: IProps) {
    const router = useRouter();

    const { data, isPending, isError } = useGetMe();

    const user = data?.data;

    const isAuthorized = !!user && roles.includes(user.role);

    useEffect(() => {
        if (!isPending && (isError || !user)) {
            router.replace("/login");
        }
    }, [isPending, isError, user, router]);

    if (isPending) {
        return <AuthLoading />
    }

    if (isError || !user) {
        return <AuthLoading label="Redirecting....." />;
    }

    if (isAuthorized) {
        return <>{children}</>
    }

    return <AccessDenied />;
}