import { Skeleton } from "@/components/ui/skeleton";

export function DoctorApprovalSheetSkeleton() {
    return (
        <div className="mt-6 space-y-6">
            <Skeleton className="h-5 w-40" />

            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
            </div>

            <Skeleton className="h-5 w-40" />

            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
            </div>
        </div>
    );
}