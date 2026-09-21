"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import DoctorApprovalSheet from "./doctor-approval-sheet";
import { useSuspenceGetAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types";

interface DoctorApprovalTableProps extends DoctorParams { }

export default function DoctorApprovalTable(
    params: DoctorApprovalTableProps
) {
    const { data } = useSuspenceGetAllDoctors(params);

    const doctors = data?.data;

    return (
        <Table className="border">
            <TableCaption>
                List of doctors awaiting verification.
            </TableCaption>

            <TableHeader>
                <TableRow className="text-sm font-bold">
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {doctors.map((doctor: any) => (
                    <TableRow key={doctor.id}>
                        <TableCell>
                            <div className="space-y-1">
                                <p className="font-medium">
                                    {doctor.name}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {doctor.email}
                                </p>
                            </div>
                        </TableCell>

                        <TableCell>
                            {doctor.specialization || "N/A"}
                        </TableCell>

                        <TableCell>
                            {doctor.qualification || "N/A"}
                        </TableCell>

                        <TableCell>
                            {doctor.experinenceYears
                                ? `${doctor.experinenceYears} ${doctor.experinenceYears === 1
                                    ? "year"
                                    : "years"
                                }`
                                : "N/A"}
                        </TableCell>

                        <TableCell>
                            {doctor.licenseNumber || "N/A"}
                        </TableCell>

                        <TableCell>
                            <Badge
                                variant={
                                    doctor.verificationStatus ===
                                        "PENDING"
                                        ? "secondary"
                                        : doctor.verificationStatus ===
                                            "APPROVED"
                                            ? "default"
                                            : "destructive"
                                }
                            >
                                {doctor.verificationStatus}
                            </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                            <DoctorApprovalSheet doctorId={doctor?.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6}>
                        Total Doctors
                    </TableCell>

                    <TableCell className="text-right font-medium">
                        {doctors.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}