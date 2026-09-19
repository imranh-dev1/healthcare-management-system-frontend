"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Attachment } from "../ui/attachment";
import { cn } from "cn";
import { FileText, Upload, X } from "lucide-react";
import { ApplyingAsDoctorValidationSchema } from "@/validation";
import { useApplyAsDoctor } from "@/hooks";

function isFieldInvalid(field: {
    state: {
        meta: {
            isTouched: boolean;
            isValid: boolean;
        };
    };
}) {
    return field.state.meta.isTouched && !field.state.meta.isValid;
}

export function ApplyForm() {
    const { mutate: applyDoctor, isPending } = useApplyAsDoctor()

    const form = useForm({
        defaultValues: {
            user: {
                name: "",
                email: "",
            },

            doctor: {
                address: "",
                specialization: "",
                licenseNumber: "",
                qualification: "",
                experinenceYears: 0,
                bio: "",
                consultationFee: 0,
                contactNumber: "",
                resume: null as File | null,
                additionalFiles: [] as File[],
            },
        },

        validators: {
            onSubmit: ApplyingAsDoctorValidationSchema,
        },

        onSubmit: async ({ value }) => {
            const applyPayload = {
                user: {
                    name: value.user.name,
                    email: value.user.email,
                },
                doctor: {
                    address: value.doctor.address,
                    specialization: value.doctor.specialization,
                    licenseNumber: value.doctor.licenseNumber,
                    qualification: value.doctor.qualification,
                    experinenceYears: value.doctor.experinenceYears,
                    bio: value.doctor.bio,
                    consultationFee: value.doctor.consultationFee,
                    contactNumber: value.doctor.contactNumber,
                    resume: value.doctor.resume,
                    additionalFiles: value.doctor.additionalFiles,
                },
            };

            applyDoctor({ data: applyPayload, resume: value.doctor.resume!, additionalFiles: value.doctor.additionalFiles }, {
                onSuccess: (res) => {
                    console.log(res);

                    toast.success(res.message || "Application submitted successfully.");
                },
                onError: (err) => {
                    toast.error("Something went wrong. Please try again.");
                }
            })


        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="w-full"
        >
            <Card className="overflow-hidden">
                <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                        Apply as a Doctor
                    </CardTitle>

                    <FieldDescription>
                        Complete your professional information to submit your
                        doctor application.
                    </FieldDescription>
                </CardHeader>

                <CardContent className="p-6">
                    <FieldGroup className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Name */}
                            <form.Field name="user.name">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Full Name
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="John Doe"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                                autoComplete="name"
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Email */}
                            <form.Field name="user.email">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Email
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="doctor@example.com"
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

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold">
                                Professional Information
                            </h2>

                            <FieldDescription>
                                Provide your medical and professional details.
                            </FieldDescription>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Specialization */}
                            <form.Field name="doctor.specialization">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Specialization
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                placeholder="Cardiologist"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* License */}
                            <form.Field name="doctor.licenseNumber">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Medical License Number
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                placeholder="BMDC-123456"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Qualification */}
                            <form.Field name="doctor.qualification">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Qualification
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                placeholder="MBBS, FCPS"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Experience */}
                            <form.Field name="doctor.experinenceYears">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Years of Experience
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                min={0}
                                                max={70}
                                                placeholder="5"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Consultation Fee */}
                            <form.Field name="doctor.consultationFee">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Consultation Fee
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                min={0}
                                                placeholder="500"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Contact */}
                            <form.Field name="doctor.contactNumber">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Contact Number
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="tel"
                                                placeholder="01712345678"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Address - Full Width */}
                            <form.Field name="doctor.address">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="md:col-span-2"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Address
                                            </FieldLabel>

                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                placeholder="Enter your clinic or professional address"
                                                rows={3}
                                                value={field.state.value ?? ""}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Bio - Full Width */}
                            <form.Field name="doctor.bio">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="md:col-span-2"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Professional Bio
                                            </FieldLabel>

                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                placeholder="Tell patients about yourself and your professional experience..."
                                                rows={5}
                                                value={field.state.value ?? ""}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={field.handleBlur}
                                                aria-invalid={isInvalid}
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Resume */}
                            <form.Field name="doctor.resume">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);
                                    const file = field.state.value;

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="md:col-span-2"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Resume / CV
                                            </FieldLabel>

                                            <div className="space-y-3">
                                                <label
                                                    htmlFor={field.name}
                                                    className={cn(
                                                        "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition-colors",
                                                        "hover:border-primary/50 hover:bg-muted/50",
                                                        isInvalid && "border-destructive"
                                                    )}
                                                >
                                                    <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
                                                        <Upload className="size-5 text-muted-foreground" />
                                                    </div>

                                                    <p className="text-sm font-medium">
                                                        {file
                                                            ? "Change your resume"
                                                            : "Upload your resume"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        Click to browse or drag and drop
                                                    </p>

                                                    <p className="mt-2 text-xs text-muted-foreground">
                                                        PDF, DOC, DOCX, JPG, PNG · Max 5MB
                                                    </p>

                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                        className="hidden"
                                                        onChange={(event) => {
                                                            const selectedFile =
                                                                event.target.files?.[0] ?? null;

                                                            field.handleChange(selectedFile);

                                                            event.target.value = "";
                                                        }}
                                                        onBlur={field.handleBlur}
                                                    />
                                                </label>

                                                {file && (
                                                    <Attachment className="w-full">
                                                        <div className="flex min-w-0 flex-1 items-center gap-3">
                                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                                                <FileText className="size-4 text-muted-foreground" />
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-medium">
                                                                    {file.name}
                                                                </p>

                                                                <p className="text-xs text-muted-foreground">
                                                                    {(
                                                                        file.size /
                                                                        1024 /
                                                                        1024
                                                                    ).toFixed(2)}{" "}
                                                                    MB
                                                                </p>
                                                            </div>

                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-8 shrink-0"
                                                                onClick={() =>
                                                                    field.handleChange(null)
                                                                }
                                                                aria-label="Remove resume"
                                                            >
                                                                <X className="size-4" />
                                                            </Button>
                                                        </div>
                                                    </Attachment>
                                                )}
                                            </div>

                                            <FieldDescription>
                                                Upload your latest resume or CV. Maximum file size is
                                                5MB.
                                            </FieldDescription>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Adisonals Files */}
                            <form.Field name="doctor.additionalFiles">
                                {(field) => {
                                    const isInvalid = isFieldInvalid(field);
                                    const files = field.state.value ?? [];

                                    const handleFiles = (
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        const selectedFiles = Array.from(
                                            event.target.files ?? []
                                        );

                                        if (!selectedFiles.length) return;

                                        const remainingSlots = 5 - files.length;

                                        const validFiles: File[] = [];

                                        for (const file of selectedFiles) {
                                            if (validFiles.length >= remainingSlots) break;

                                            if (file.size > 5 * 1024 * 1024) {
                                                toast.error(
                                                    `${file.name} is larger than 5MB.`
                                                );
                                                continue;
                                            }

                                            const allowedTypes = [
                                                "application/pdf",
                                                "application/msword",
                                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                "image/png",
                                                "image/jpeg",
                                            ];

                                            if (!allowedTypes.includes(file.type)) {
                                                toast.error(
                                                    `${file.name} is not a supported file type.`
                                                );
                                                continue;
                                            }

                                            const alreadyExists = files.some(
                                                (existingFile) =>
                                                    existingFile.name === file.name &&
                                                    existingFile.size === file.size
                                            );

                                            if (!alreadyExists) {
                                                validFiles.push(file);
                                            }
                                        }

                                        if (validFiles.length > 0) {
                                            field.handleChange([
                                                ...files,
                                                ...validFiles,
                                            ]);
                                        }

                                        event.target.value = "";
                                    };

                                    const removeFile = (index: number) => {
                                        field.handleChange(
                                            files.filter(
                                                (_, fileIndex) => fileIndex !== index
                                            )
                                        );
                                    };

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="md:col-span-2"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Additional Documents
                                            </FieldLabel>

                                            <div className="space-y-3">
                                                {files.length < 5 && (
                                                    <label
                                                        htmlFor={field.name}
                                                        className={cn(
                                                            "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition-colors",
                                                            "hover:border-primary/50 hover:bg-muted/50",
                                                            isInvalid &&
                                                            "border-destructive"
                                                        )}
                                                    >
                                                        <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
                                                            <Upload className="size-5 text-muted-foreground" />
                                                        </div>

                                                        <p className="text-sm font-medium">
                                                            Upload supporting documents
                                                        </p>

                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            Click to browse or drag and drop
                                                        </p>

                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            PDF, DOC, DOCX, JPG, PNG · Max 5
                                                            files · 5MB each
                                                        </p>

                                                        <Input
                                                            id={field.name}
                                                            name={field.name}
                                                            type="file"
                                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                            multiple
                                                            className="hidden"
                                                            onChange={handleFiles}
                                                            onBlur={field.handleBlur}
                                                        />
                                                    </label>
                                                )}

                                                {files.length > 0 && (
                                                    <div className="space-y-2">
                                                        {files.map((file, index) => (
                                                            <Attachment
                                                                key={`${file.name}-${file.size}-${index}`}
                                                                className="w-full"
                                                            >
                                                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                                                        <FileText className="size-4 text-muted-foreground" />
                                                                    </div>

                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="truncate text-sm font-medium">
                                                                            {file.name}
                                                                        </p>

                                                                        <p className="text-xs text-muted-foreground">
                                                                            {(
                                                                                file.size /
                                                                                1024 /
                                                                                1024
                                                                            ).toFixed(2)}{" "}
                                                                            MB
                                                                        </p>
                                                                    </div>

                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="size-8 shrink-0"
                                                                        onClick={() =>
                                                                            removeFile(index)
                                                                        }
                                                                        aria-label={`Remove ${file.name}`}
                                                                    >
                                                                        <X className="size-4" />
                                                                    </Button>
                                                                </div>
                                                            </Attachment>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between gap-4">
                                                    <FieldDescription>
                                                        Upload certificates, licenses, or other
                                                        supporting documents.
                                                    </FieldDescription>

                                                    <span className="shrink-0 text-xs text-muted-foreground">
                                                        {files.length}/5 files
                                                    </span>
                                                </div>
                                            </div>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </div>

                        <div className="flex justify-end border-t pt-6">
                            <form.Subscribe
                                selector={(state) => [state.isSubmitting]}
                            >
                                {([isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto md:min-w-40"
                                    >
                                        {isPending ? (
                                            <>
                                                <Spinner />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Apply as Doctor"
                                        )}
                                    </Button>

                                )}
                            </form.Subscribe>
                        </div>

                    </FieldGroup>
                </CardContent>
            </Card>
        </form>
    );
}