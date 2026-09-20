"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { GoogleLoginComponet } from "../module/google-login/googleLogin";
import Image from "next/image";



type LoginFormValues = z.infer<typeof loginSchema>;

function isFieldInvalid(field: {
    state: { meta: { isTouched: boolean; isValid: boolean } };
}): boolean {
    return field.state.meta.isTouched && !field.state.meta.isValid;
}

function PasswordInput({
    className,
    type,
    ...props
}: React.ComponentProps<"input">) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                className={cn("pr-9", className)}
                {...props}
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
                {showPassword ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </button>
        </div>
    );
}

interface FormControlProps {
    name: string;
    label: string;
    isInvalid: boolean;
    errors?: React.ComponentProps<typeof FieldError>["errors"];
    action?: React.ReactNode;
    children: React.ReactNode;
}

function FormControl({
    name,
    label,
    isInvalid,
    errors,
    action,
    children,
}: FormControlProps) {
    return (
        <Field data-invalid={isInvalid}>
            <div className="flex items-center justify-between">
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                {action}
            </div>

            {children}

            {isInvalid && <FieldError errors={errors} />}
        </Field>
    );
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    const { mutate: login, isPending } = useLogin()
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } satisfies LoginFormValues,

        validators: {
            onSubmit: loginSchema,
        },

        onSubmit: async ({ value }) => {
            const loginData = {
                email: value.email,
                password: value.password
            }

            login(loginData, {
                onSuccess: (res) => {
                    toast.success(res.message || "Login successful");
                    router.push("/")
                },
                onError: (err) => {
                    toast.error("Something went wrong. Please try again.");
                }
            })
        },
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="p-6 md:p-8"
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Welcome back
                                </h1>

                                <p className="text-balance text-muted-foreground">
                                    Login to your MediCare account
                                </p>
                            </div>

                            <form.Field
                                name="email"
                            >
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <FormControl
                                            name={field.name}
                                            label="Email"
                                            isInvalid={isInvalid}
                                            errors={field.state.meta.errors}
                                        >
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="m@example.com"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                                autoComplete="email"
                                            />
                                        </FormControl>
                                    );
                                }}
                            </form.Field>

                            <form.Field
                                name="password"
                            >
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <FormControl
                                            name={field.name}
                                            label="Password"
                                            isInvalid={isInvalid}
                                            errors={field.state.meta.errors}
                                            action={
                                                <Link
                                                    href="/forgot-password"
                                                    className="text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            }
                                        >
                                            <PasswordInput
                                                id={field.name}
                                                name={field.name}
                                                placeholder="password"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                                autoComplete="current-password"
                                            />
                                        </FormControl>
                                    );
                                }}
                            </form.Field>

                            <Field>
                                <form.Subscribe>
                                    {() => (
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isPending}
                                        >
                                            {isPending
                                                ? <><Spinner /> Logging in...</>
                                                : "Login"}
                                        </Button>
                                    )}
                                </form.Subscribe>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <GoogleLoginComponet />

                            <FieldDescription className="text-center">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    {/* Image */}
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/login-image.jpg"
                            alt="Healthcare"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
                        />
                        + <Image
                            src="/login-image.jpg"
                            alt="Healthcare"
                            fill
                            priority
                            sizes="full"
                            className="object-cover dark:brightness-[0.7]"
                        />
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                    Privacy Policy
                </Link>
                .
            </FieldDescription>
        </div>
    );
}