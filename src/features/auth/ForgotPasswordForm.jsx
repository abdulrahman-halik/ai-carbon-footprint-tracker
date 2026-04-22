"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { forgotPasswordSchema, resetPasswordConfirmSchema } from "./authSchemas";
import PasswordInput from "@/components/ui/PasswordInput";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { forgotPassword, resetPassword } = useAuth();

    // Get step and email from URL params
    const stepParam = parseInt(searchParams.get("step")) || 1;
    const emailParam = searchParams.get("email") || "";

    const [step, setStep] = useState(stepParam);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(step === 1 ? forgotPasswordSchema : resetPasswordConfirmSchema),
        defaultValues: {
            email: emailParam,
            password: "",
            confirmPassword: "",
        },
    });

    // Update step and email when URL params change
    useEffect(() => {
        setStep(stepParam);
        if (emailParam) {
            reset({ email: emailParam, password: "", confirmPassword: "" });
        }
    }, [stepParam, emailParam, reset]);

    const onSubmit = async (data) => {
        setApiError("");
        setApiSuccess("");
        setLoading(true);

        try {
            if (step === 1) {
                const response = await forgotPassword(data.email);
                setApiSuccess(response.message || "If the email exists, reset instructions have been sent.");
                // Use router.push to simulate redirection to step 2
                router.push(`/forgot-password?step=2&email=${encodeURIComponent(data.email)}`);
            } else {
                const response = await resetPassword(
                    data.email,
                    "",
                    data.password,
                    data.confirmPassword
                );
                toast.success("Password reset successful.");
                router.push("/login");
            }
        } catch (err) {
            setApiError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-0/50">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    {step === 1 ? "Forgot Password?" : "Set New Password"}
                </CardTitle>
                <CardDescription>
                    {step === 1
                        ? "Enter your email to receive a verification code"
                        : "Enter the code sent to your email and your new password"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {apiSuccess && step === 2 && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 flex items-start space-x-3">
                        <Icon icon={CheckCircle2} className="h-5 w-5 text-green-500 mt-0.5" />
                        <p className="text-sm text-green-700">{apiSuccess}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Icon
                                icon={Mail}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                            />
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                                readOnly={step === 2}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {step === 2 && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <PasswordInput
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <PasswordInput
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("confirmPassword")}
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </>
                    )}

                    {apiError && (
                        <div className="text-sm text-red-500 font-medium">
                            {apiError}
                        </div>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Icon icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
                                {step === 1 ? "Sending..." : "Resetting..."}
                            </>
                        ) : (
                            step === 1 ? "Verify" : "Reset Password"
                        )}
                    </Button>
                </form>
            </CardContent>
            {!apiSuccess && (
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-500">
                    <Link href="/login" className="flex items-center justify-center text-primary hover:underline font-medium">
                        <Icon icon={ArrowLeft} className="mr-2 h-4 w-4" />
                        Back to sign in
                    </Link>
                </CardFooter>
            )}
        </Card>
    );
}
