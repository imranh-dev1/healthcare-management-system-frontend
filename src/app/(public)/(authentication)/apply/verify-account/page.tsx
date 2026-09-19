import { VerifyAccountForm } from "@/components/form/verify-form";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";


export default function VerifyAccountPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-md">
                <Suspense fallback={<Spinner />}>
                    <VerifyAccountForm mode="doctor" />
                </Suspense>
            </div>
        </div>
    );
}