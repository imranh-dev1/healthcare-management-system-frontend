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


function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
            />
        </svg>
    );
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } satisfies LoginFormValues,

        validators: {
            onSubmit: loginSchema,
        },

        onSubmit: async ({ value }) => {
            console.log(value);

            // TODO: replace with the real login API call
            // await login(value);
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
                                children={(field) => {
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
                            />

                            <form.Field
                                name="password"
                                children={(field) => {
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
                            />

                            <Field>
                                <form.Subscribe
                                    selector={(state) => [
                                        state.canSubmit,
                                        state.isSubmitting,
                                    ]}
                                    children={([canSubmit, isSubmitting]) => (
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={
                                                !canSubmit || isSubmitting
                                            }
                                        >
                                            {isSubmitting
                                                ? "Logging in..."
                                                : "Login"}
                                        </Button>
                                    )}
                                />
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field className="grid gap-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                >
                                    <GoogleIcon className="size-4" />
                                    Continue with Google
                                </Button>
                            </Field>

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