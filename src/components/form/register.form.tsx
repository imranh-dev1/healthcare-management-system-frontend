"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRegister } from "@/hooks";
import { GoogleLoginComponet } from "../module/google-login/googleLogin";
import registerImg from "@/assest/auth/register.jpg"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "@/validation";
import { IRegisterPatientPayload } from "@/types";


function PasswordInput({ className, type, ...props }: React.ComponentProps<"input">) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <Input type={showPassword ? "text" : "password"}
                className={cn("pr-9", className)} {...props} />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground" > {showPassword ? (<EyeOff className="size-4" />) : (<Eye className="size-4" />)} </button> </div>);
}


export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();

    const { mutate: registerPatient, isPending } = useRegister();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            contactNumber: "",
            address: "",
            password: "",
            confirmPassword: "",
        },

        validators: {
            onSubmit: registerSchema,
        },

        onSubmit: async ({ value }) => {
            const payload: IRegisterPatientPayload = {
                name: value.name,
                email: value.email,
                password: value.password,
                patient: {
                    contactNumber: value.contactNumber,
                    address: value.address
                }
            };

            registerPatient(payload, {
                onSuccess: (res) => {
                    if (!res.success) {
                        toast.error("Something Won't Work. Please try again.");
                    }
                    toast.success(
                        res?.message || "Account created successfully"
                    );
                    const params = new URLSearchParams({ email: payload.email })
                    router.push(`/register/verify-account?${params.toString()}`);
                },
                onError: (err) => {
                    toast.error("Registration failed. Please try again.");
                }

            });



        },
    });



    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            form.handleSubmit();
                        }}
                        className="p-6 md:p-8"
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Create your account
                                </h1>

                                <p className="text-sm text-balance text-muted-foreground">
                                    Enter your email below to create your account
                                </p>
                            </div>

                            {/* Name */}
                            <form.Field name="name">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <FieldLabel htmlFor="name">
                                                Name
                                            </FieldLabel>

                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(event.target.value)
                                                }
                                                aria-invalid={hasError}
                                                required
                                            />

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {field.state.meta.errors[0]?.message}
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
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
                                                onChange={(event) =>
                                                    field.handleChange(event.target.value)
                                                }
                                                aria-invalid={hasError}
                                                required
                                            />

                                            {hasError ? (
                                                <p className="text-sm text-destructive">
                                                    {field.state.meta.errors[0]?.message}
                                                </p>
                                            ) : (
                                                <FieldDescription>
                                                    We&apos;ll use this to contact you. We will not
                                                    share your email with anyone else.
                                                </FieldDescription>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Contact Number */}
                            <form.Field name="contactNumber">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <FieldLabel htmlFor="contactNumber">
                                                Contact Number
                                            </FieldLabel>

                                            <Input
                                                id="contactNumber"
                                                type="tel"
                                                placeholder="+8801XXXXXXXXX"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(event.target.value)
                                                }
                                                aria-invalid={hasError}
                                            />

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {field.state.meta.errors[0]?.message}
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Address */}
                            <form.Field name="address">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <FieldLabel htmlFor="address">
                                                Address
                                            </FieldLabel>

                                            <Input
                                                id="address"
                                                type="text"
                                                placeholder="Rajshahi, Bangladesh"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(event.target.value)
                                                }
                                                aria-invalid={hasError}
                                            />

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {field.state.meta.errors[0]?.message}
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Passwords */}
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <form.Field
                                        name="password"
                                    >
                                        {(field) => {
                                            const hasError =
                                                field.state.meta.isTouched &&
                                                field.state.meta.errors.length > 0;
                                            return (
                                                <Field data-invalid={hasError}>
                                                    <FieldLabel htmlFor={field.name}>
                                                        Password
                                                    </FieldLabel>
                                                    <PasswordInput
                                                        id={field.name}
                                                        name={field.name}
                                                        placeholder="Password"
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        onBlur={field.handleBlur}
                                                        aria-invalid={hasError}
                                                        autoComplete="new-password"
                                                        required
                                                    />
                                                    {hasError && (
                                                        <p className="text-sm text-destructive">
                                                            {field.state.meta.errors[0]?.message}
                                                        </p>
                                                    )}
                                                </Field>
                                            );
                                        }}
                                    </form.Field>
                                    <form.Field
                                        name="confirmPassword"
                                    >
                                        {(field) => {
                                            const hasError =
                                                field.state.meta.isTouched &&
                                                field.state.meta.errors.length > 0;
                                            return (
                                                <Field data-invalid={hasError}>
                                                    <FieldLabel htmlFor={field.name}>
                                                        Confirm Password
                                                    </FieldLabel>
                                                    <PasswordInput
                                                        id={field.name}
                                                        name={field.name}
                                                        placeholder="Confirm Password"
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        onBlur={field.handleBlur}
                                                        aria-invalid={hasError}
                                                        autoComplete="new-password"
                                                        required
                                                    />
                                                    {hasError && (
                                                        <p className="text-sm text-destructive">
                                                            {field.state.meta.errors[0]?.message}
                                                        </p>
                                                    )}
                                                </Field>
                                            );
                                        }}
                                    </form.Field>
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            {/* Submit */}
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending ? "Creating Account..." : "Create Account"}
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <GoogleLoginComponet />

                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <a href="/login">Sign in</a>
                            </FieldDescription>


                        </FieldGroup>
                    </form>

                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src={registerImg}
                            alt="Image"
                            loading="eager"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="/terms-of-service">Terms of Service</a>{" "}
                and <a href="/privacy-policy">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
} 
