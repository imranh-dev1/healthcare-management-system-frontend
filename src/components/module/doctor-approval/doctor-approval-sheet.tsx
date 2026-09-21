import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function DoctorApprovalSheet() {
    return (
        <Sheet>
            <SheetTrigger className="border border-primary px-3 py-0.5">
                {/* <Button variant="default">Review</Button> */}
                Review
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>This action cannot be undone.</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}