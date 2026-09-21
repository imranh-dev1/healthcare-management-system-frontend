import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorApprovalTableSkeleton() {
    return (
        <Table className="border">
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
                {Array.from({ length: 6 }).map((_, index) => (
                    <TableRow key={index}>
                        {/* Doctor */}
                        <TableCell>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-44" />
                            </div>
                        </TableCell>

                        {/* Specialization */}
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>

                        {/* Qualification */}
                        <TableCell>
                            <Skeleton className="h-4 w-28" />
                        </TableCell>

                        {/* Experience */}
                        <TableCell>
                            <Skeleton className="h-4 w-16" />
                        </TableCell>

                        {/* License */}
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </TableCell>

                        {/* Action */}
                        <TableCell>
                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-20" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}