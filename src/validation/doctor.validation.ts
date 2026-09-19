import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
];

const fileSchema = z
    .instanceof(File)
    .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "File size must not exceed 5 MB."
    )
    .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        "Only PDF, DOC, DOCX, PNG, and JPG files are accepted."
    );

export const ApplyingAsDoctorValidationSchema = z.object({
    user: z.object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters long.")
            .max(100, "Name must not exceed 100 characters."),

        email: z
            .string()
            .trim()
            .email("Please provide a valid email address.")
            .toLowerCase(),
    }),

    doctor: z.object({
        address: z
            .string()
            .trim()
            .max(255, "Address must not exceed 255 characters."),

        specialization: z
            .string()
            .trim()
            .min(2, "Specialization is required.")
            .max(100, "Specialization must not exceed 100 characters."),

        licenseNumber: z
            .string()
            .trim()
            .min(3, "License number is required.")
            .max(100, "License number must not exceed 100 characters."),

        qualification: z
            .string()
            .trim()
            .min(2, "Qualification is required.")
            .max(255, "Qualification must not exceed 255 characters."),

        experinenceYears: z
            .number()
            .int("Experience years must be a whole number.")
            .min(0, "Experience years cannot be negative.")
            .max(70, "Experience years cannot exceed 70."),

        bio: z
            .string()
            .trim()
            .max(1000, "Bio must not exceed 1000 characters."),

        consultationFee: z
            .number()
            .min(0, "Consultation fee cannot be negative."),

        contactNumber: z
            .string()
            .trim()
            .regex(
                /^(?:\+8801|01)[3-9]\d{8}$/,
                "Invalid Bangladeshi phone number."
            ),

        resume: fileSchema
            .nullable()
            .refine(
                (file) => file !== null,
                "Resume is required."
            ),

        additionalFiles: z
            .array(fileSchema)
            .max(5, "You can upload a maximum of 5 files."),
    }),
});