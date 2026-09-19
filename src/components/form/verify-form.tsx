"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { IVerifyAccountPayload } from "@/types";
import { verifyAccountSchema } from "@/validation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { useDoctorVerifyAccount, useVerifyAccount } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";



export function VerifyAccountForm({ mode = "patient" }: { mode: "doctor" | "patient" }) {
    const router = useRouter();
    const params = useSearchParams()
    const [countdown, setCountdown] = useState(300);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const createEmail = params.get("email");

    const { mutate: verifyPatient, isPending: patientIsPending } = useVerifyAccount()
    const { mutate: verifyDoctor, isPending: doctorIsPending } = useDoctorVerifyAccount()

    const isPending = mode === "doctor" ? doctorIsPending : patientIsPending;
    const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

    const form = useForm({
        defaultValues: {
            email: createEmail ?? "",
            otp: "",
        },

        validators: {
            onSubmit: verifyAccountSchema,
        },

        onSubmit: async ({ value }) => {
            const payload: IVerifyAccountPayload = {
                email: value.email,
                otp: value.otp,
            };

            verify(payload, {

                onSuccess: (res) => {
                    if (!res.success) {
                        toast.error("Something Won't Wrong. Please try again.");
                    }
                    console.log(res);
                    if (mode === "doctor") {
                        toast.success(res?.message || "Doctor account verified successfully! Please wait for admin approval.");
                        
                        router.push("/")
                        return;
                    }
                    toast.success(res?.message || "Account verified successfully!");
                    router.push("/")
                },
                onError: (error) => {
                    toast.error(error?.message || "Verification failed. Please try again.");
                },
            });
        },
    });

    useEffect(() => {
        if (!createEmail) {
            toast.error("Email not found. Please create an account and try again.");
            router.push("/");
        }
    }, [createEmail, router]);

    if (!createEmail) return null;

    return (
        <div
            className={cn("w-full")} >
            <Card className="w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        Verify your account
                    </CardTitle>

                    <CardDescription>
                        Enter your email address and the 6-digit OTP
                        sent to your email.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            form.handleSubmit();
                        }}>
                        <FieldGroup>
                            {/* Email */}
                            <form.Field name="email">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <FieldLabel htmlFor="email">
                                                Email
                                            </FieldLabel>

                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                readOnly
                                                aria-invalid={hasError}
                                                autoComplete="email"
                                            />

                                            {hasError ? (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        field.state.meta
                                                            .errors[0]?.message
                                                    }
                                                </p>
                                            ) : (
                                                <FieldDescription>
                                                    The email address associated with your account.
                                                </FieldDescription>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* OTP */}
                            <form.Field name="otp">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <FieldLabel htmlFor="otp">
                                                Verification Code
                                            </FieldLabel>

                                            <InputOTP
                                                maxLength={6}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(value) => field.handleChange(value)}
                                                aria-invalid={hasError}
                                                id="otp"
                                                autoComplete="one-time-code"
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>

                                                <InputOTPSeparator />

                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>

                                            {hasError ? (
                                                <p className="text-sm text-destructive">
                                                    {field.state.meta.errors[0]?.message}
                                                </p>
                                            ) : (
                                                <FieldDescription>
                                                    Enter the 6-digit verification code sent to your email.
                                                </FieldDescription>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>


                            {/* Submit */}
                            <form.Subscribe
                                selector={(state) => state.isSubmitting}
                            >
                                {(isSubmitting) => (
                                    <Field>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isPending}
                                        >
                                            {isPending
                                                ? <><Spinner /> Verifying...</>
                                                : "Verify Account"}
                                        </Button>
                                    </Field>
                                )}
                            </form.Subscribe>

                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code?{" "}

                                {countdown > 0 ? (
                                    <span className="font-medium">
                                        Resend OTP in {formatTime(countdown)}
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        className="font-medium underline underline-offset-4 hover:text-primary"
                                        onClick={() => {
                                            toast.info("Resend OTP functionality coming soon.");

                                            setCountdown(300);

                                        }}
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </FieldDescription>

                            {/* Login */}
                            <FieldDescription className="text-center">
                                Already verified?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium underline underline-offset-4"
                                >
                                    Sign in
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 