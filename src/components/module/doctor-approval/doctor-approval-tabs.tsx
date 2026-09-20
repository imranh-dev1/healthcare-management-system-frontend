import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";

export default function DoctorApprovalTabs() {
    return (
        <>
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejeced</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="approved">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="rejected">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="all">
                    <DoctorApprovalTable />
                </TabsContent>
            </Tabs >
        </>

    )
}