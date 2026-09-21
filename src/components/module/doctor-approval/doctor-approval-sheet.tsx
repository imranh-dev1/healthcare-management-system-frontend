"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useGetSingleDoctor } from "@/hooks";
import { DoctorApprovalSheetSkeleton } from "./doctor-approval-sheet-skeleton";

interface DoctorApprovalSheetProps {
    doctorId: string;
}

export default function DoctorApprovalSheet({
    doctorId,
}: DoctorApprovalSheetProps) {
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useGetSingleDoctor(
        {
            doctorId,
        },
        open
    );

    const doctor = data?.data;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="border border-primary px-3 py-0.5">
                Review
            </SheetTrigger>

            <SheetContent className="overflow-y-auto sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>
                        Doctor Review
                    </SheetTitle>

                    <SheetDescription>
                        Review doctor information before taking an action.
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DoctorApprovalSheetSkeleton />
                ) : (
                    <div className="mt-6 space-y-6 px-4">
                        {/* Personal Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">
                                        Name
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.name || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Email
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.email || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold">
                                Professional Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">
                                        Specialization
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.specialization || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Qualification
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.qualification || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Experience
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.experinenceYears
                                            ? `${doctor.experinenceYears} ${doctor.experinenceYears === 1
                                                ? "year"
                                                : "years"
                                            }`
                                            : "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        License
                                    </p>
                                    <p className="font-medium">
                                        {doctor?.licenseNumber || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

