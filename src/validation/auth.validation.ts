import z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address"),

    password: z.string().min(1, "Password is required"),
});


export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters long"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    contactNumber: z
        .string()
        .regex(
            /^(?:\+8801|01)[3-9]\d{8}$/,
            "Invalid Bangladeshi phone number"
        ),
    address: z.string(),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),

    confirmPassword: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});


export const verifyAccountSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address."),

    otp: z
        .string()
        .trim()
        .min(1, "OTP is required.")
        .length(6, "OTP must be 6 digits.")
        .regex(/^\d{6}$/, "OTP must contain only numbers."),
});