import { z } from "zod";

// ---------- Reusable fields ----------

const email = z.string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(255, "Email must not exceed 255 characters")
    .email("Please enter a valid email address");

// For register / reset only. bcrypt limit is 72 BYTES, not characters.
const newPassword = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .refine(
        (v) => new TextEncoder().encode(v).length <= 72,
        "Password is too long (max 72 bytes)"
    );

const confirmPassword = z.string().min(1, "Please confirm your password");

const sixDigitCode = (label) =>
    z.string()
        .trim()
        .regex(/^\d{6}$/, `${label} must be exactly 6 digits`);

// ---------- Shared cross-field check ----------

const passwordsMatch = (data) => data.password === data.confirmPassword;
const passwordsMismatch = {
    message: "Passwords do not match",
    path: ["confirmPassword"],
};

// ---------- Schemas ----------

export const loginSchema = z.object({
    email,
    password: z.string()
        .min(1, "Password is required")
        .max(128, "Password is too long"),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordConfirmSchema = z
    .object({
        email,
        verificationCode: sixDigitCode("Verification code"),
        password: newPassword,
        confirmPassword,
    })
    .refine(passwordsMatch, passwordsMismatch);

export const registerSchema = z
    .object({
        name: z.string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must not exceed 50 characters")
            .regex(
                /^[\p{L}\p{M}\s'’-]+$/u,
                "Name can only contain letters, spaces, hyphens, and apostrophes"
            ),
        email,
        password: newPassword,
        confirmPassword,
    })
    .refine(passwordsMatch, passwordsMismatch);

export const otpVerifySchema = z.object({
    email,
    otp: sixDigitCode("OTP"),
});