"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { forgotPasswordSchema } from "./authSchemas";

export default function ForgotPasswordForm() {
    const { forgotPassword } = useAuth();
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        setApiError("");
        setApiSuccess("");
        setLoading(true);

        try {
            const response = await forgotPassword(data.email);
            setApiSuccess(response.message || "Password reset instructions sent.");
        } catch (err) {
            setApiError(err.message || "Failed to send reset instructions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-0/50">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    Forgot Password
                </CardTitle>
                <CardDescription>
                    Enter your email to receive a password reset link
                </CardDescription>
            </CardHeader>
            <CardContent>
                {apiSuccess ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                        <Icon icon={CheckCircle2} className="h-12 w-12 text-green-500" />
                        <div className="text-sm font-medium text-green-600">
                            {apiSuccess}
                        </div>
                        <Button asChild className="w-full mt-4">
                            <Link href="/login">Return to Sign In</Link>
                        </Button>
                    </div>
                ) : (
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
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {apiError && (
                            <div className="text-sm text-red-500 font-medium">
                                {apiError}
                            </div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Icon icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                    </form>
                )}
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
