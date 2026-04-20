                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            import { z } from "zod";

export const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .transform((val) => val.toLowerCase().trim()),
    password: z.string()
        .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .transform((val) => val.toLowerCase().trim()),
});

export const registerSchema = z
    .object({
        name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must not exceed 50 characters")
            .trim()
            .regex(/^[a-zA-Z\s'\-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
        email: z.string()
            .min(1, "Email is required")
            .email("Please enter a valid email address")
            .max(255, "Email must not exceed 255 characters")
            .transform((val) => val.toLowerCase().trim()),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must not exceed 72 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
        confirmPassword: z.string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });