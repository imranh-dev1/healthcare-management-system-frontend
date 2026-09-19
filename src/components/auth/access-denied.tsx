"use client";

import { useRouter } from "next/navigation";
import { MoveRightIcon, ShieldX } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccessDeniedProps {
    title?: string;
    description?: string;
    buttonText?: string;
    path?: string;
    onAction?: () => void;
}

export function AccessDenied({
    title = "Access Denied",
    description = "You don't have permission to access this page.",
    buttonText = "Go to Home",
    path = "/",
    onAction,
}: AccessDeniedProps) {
    const router = useRouter();

    const handleAction = () => {
        if (onAction) {
            onAction();
            return;
        }

        router.replace(path);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="flex flex-col items-center text-center">
                    <div className="mb-2 flex size-14 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                        <ShieldX className="block size-7 text-destructive" />
                    </div>

                    <CardTitle className="text-xl">
                        {title}
                    </CardTitle>

                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button type="button" onClick={handleAction}>
                        {buttonText} <MoveRightIcon />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
} 