"use client";

import { Suspense, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import DoctorApprovalTable from "./doctor-approval-table";
import { VerificationStatus } from "@/types";
import DoctorApprovalTableSkeleton from "./doctor-approval-table-skeleton";

const doctorActiveStatus: ["ALL" | VerificationStatus, string][] = [
    ["ALL", "All"],
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
];

export default function DoctorApprovalTabs() {
    const [status, setStatus] = useState<"ALL" | VerificationStatus>("ALL");
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <Tabs
                    value={status}
                    onValueChange={(value) =>
                        setStatus(value as "ALL" | VerificationStatus)
                    }
                >
                    <TabsList>
                        {doctorActiveStatus.map(([status, label]) => (
                            <TabsTrigger className="px-4"
                                key={status}
                                value={status}
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search by name or email..."
                        className="pl-9"
                    />
                </div>
            </div>

            <Suspense fallback={<DoctorApprovalTableSkeleton />}>
                <DoctorApprovalTable />
            </Suspense>
        </div>
    );
}