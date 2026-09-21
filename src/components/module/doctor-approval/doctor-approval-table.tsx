"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DoctorApprovalSheet from "./doctor-approval-sheet";
import { useGetAllDoctors } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function DoctorApprovalTable() {
    const { data, isPending } = useGetAllDoctors();

    const doctors = data?.data || [];

    console.log(doctors);


    if (isPending) {
        return <Spinner />
    }


    return (
        <Table className="border">
            <TableCaption>
                List of doctors awaiting verification.
            </TableCaption>

            <TableHeader>
                <TableRow className="font-bold text-sm">
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {doctors?.map((doctor: any) => (
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
                                    doctor.verificationStatus === "PENDING"
                                        ? "secondary"
                                        : doctor.verificationStatus === "APPROVED"
                                            ? "default"
                                            : "destructive"
                                }
                            >
                                {doctor.verificationStatus}
                            </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                            <DoctorApprovalSheet />
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
                        {doctors?.length ?? 0}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}