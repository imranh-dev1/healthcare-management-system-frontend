import { Spinner } from "../ui/spinner";

export default function AuthLoading({
    label = "Verifying Account",
}: {
    label?: string;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex gap-3 items-center">
                <Spinner className="size-8 text-primary" />
                {label}
            </div>
        </div>
    )
}