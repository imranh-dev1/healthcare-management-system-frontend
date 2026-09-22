"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    X,
    UserRound,
    Stethoscope,
} from "lucide-react";

import { useApprovedDoctor, useGetSingleDoctor } from "@/hooks";
import { DoctorApprovalSheetSkeleton } from "./doctor-approval-sheet-skeleton";
import { ApprovedDoctor } from "@/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface DoctorApprovalSheetProps {
    doctorId: string;
}

export default function DoctorApprovalSheet({
    doctorId,
}: DoctorApprovalSheetProps) {
    const [open, setOpen] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const { data, isLoading } = useGetSingleDoctor({ doctorId }, open);
    const { mutateAsync: approveDoctor, isPending } = useApprovedDoctor();

    const doctor = data?.data;

    const handleApprove = async () => {
        const approvedPayload: ApprovedDoctor = {
            doctorId,
            verificationStatus: "APPROVED",
        }

        await approveDoctor(approvedPayload, {
            onSuccess: () => {
                toast.success("Doctor approved successfully");
                setOpen(false);
            },
            onError: (err) => {
                console.log("Failed to approve doctor:", err)
            }
        });
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            return;
        }

        const rejectedPayload: ApprovedDoctor = {
            doctorId,
            verificationStatus: "REJECT",
            rejectionReason: rejectionReason.trim(),
        };

        await approveDoctor(rejectedPayload, {
            onSuccess: () => {
                toast.success("Doctor rejected successfully");
                setOpen(false);
                setShowReject(false);
                setRejectionReason("");
            },
            onError: (err) => {
                console.log("Failed to reject doctor:", err)
            }
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    Review
                </Button>
            </SheetTrigger>

            <SheetContent
                className="flex w-full flex-col overflow-hidden sm:max-w-xl"
            >
                <SheetHeader className="shrink-0 border-b pb-4">
                    <SheetTitle>Doctor Review</SheetTitle>

                    <SheetDescription>
                        Review the doctor's information and verify their
                        application.
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <div className="flex-1 overflow-y-auto">
                        <DoctorApprovalSheetSkeleton />
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            {/* Doctor Header */}
                            <div className="mb-6 flex items-center gap-4  border bg-muted/30 p-4">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <UserRound className="size-7 text-primary" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-lg font-semibold">
                                        {doctor?.name || "N/A"}
                                    </h2>

                                    <p className="truncate text-sm text-muted-foreground">
                                        {doctor?.email || "N/A"}
                                    </p>

                                    <div className="mt-2">
                                        <Badge variant="secondary">
                                            {doctor?.verificationStatus ||
                                                "PENDING"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-7">
                                {/* Personal Information */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <UserRound className="size-4 text-primary" />

                                        <h3 className="font-semibold">
                                            Personal Information
                                        </h3>
                                    </div>

                                    <Separator />

                                    <InfoItem
                                        label="Full Name"
                                        value={doctor?.name}
                                    />

                                    <div className="">
                                        <InfoItem
                                            label="Email"
                                            value={doctor?.email}
                                        />
                                    </div>

                                </section>

                                {/* Professional Information */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="size-4 text-primary" />

                                        <h3 className="font-semibold">
                                            Professional Information
                                        </h3>
                                    </div>

                                    <Separator />

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <InfoItem
                                            label="Specialization"
                                            value={doctor?.specialization}
                                        />

                                        <InfoItem
                                            label="Qualification"
                                            value={doctor?.qualification}
                                        />

                                        <InfoItem
                                            label="Experience"
                                            value={
                                                doctor?.experinenceYears
                                                    ? `${doctor.experinenceYears} ${doctor.experinenceYears ===
                                                        1
                                                        ? "year"
                                                        : "years"
                                                    } `
                                                    : undefined
                                            }
                                        />

                                        <InfoItem
                                            label="License Number"
                                            value={doctor?.licenseNumber}
                                        />
                                    </div>
                                </section>

                                {/* Rejection Reason */}
                                {showReject && (
                                    <section className="space-y-3  border border-destructive/30 bg-destructive/5 p-4">
                                        <div>
                                            <Label htmlFor="rejectionReason">
                                                Rejection Reason
                                            </Label>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Please provide a reason for
                                                rejecting this application.
                                            </p>
                                        </div>

                                        <Input
                                            id="rejectionReason"
                                            value={rejectionReason}
                                            onChange={(event) =>
                                                setRejectionReason(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter rejection reason..."
                                        />
                                    </section>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <SheetFooter className="shrink-0 border-t bg-background pt-4">
                            {!showReject ? (
                                <div className="flex w-full gap-3">
                                    {/* Reject */}
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={() => setShowReject(true)}
                                        disabled={isPending}
                                    >
                                        <X className="mr-2 size-4" />
                                        Reject
                                    </Button>

                                    {/* Approve */}
                                    <Button
                                        className="flex-1"
                                        onClick={handleApprove}
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <>
                                                <Spinner className="mr-2" />
                                                Approving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="mr-2 size-4" />
                                                Approve
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex w-full gap-3">
                                    {/* Cancel */}
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => {
                                            setShowReject(false);
                                            setRejectionReason("");
                                        }}
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>

                                    {/* Confirm Rejection */}
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        disabled={!rejectionReason.trim() || isPending}
                                        onClick={handleReject}
                                    >
                                        {isPending ? (
                                            <>
                                                <Spinner className="mr-2" />
                                                Rejecting...
                                            </>
                                        ) : (
                                            <>
                                                <X className="mr-2 size-4" />
                                                Confirm Rejection
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div className=" border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-medium">
                {value || "N/A"}
            </p>
        </div>
    );
}