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
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { otpVerifySchema } from "./authSchemas";
import { toast } from "react-hot-toast";

export default function ActivateAccount() {
    const { verifyOtp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email") || "";

    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(otpVerifySchema),
        defaultValues: {
            email: emailFromUrl,
            otp: "",
        },
    });

    const onSubmit = async (data) => {
        setApiError("");
        setLoading(true);

        try {
            const response = await verifyOtp({
                email: data.email,
                otp_code: data.otp,
            });

            toast.success("Account activated successfully");
            router.push("/login");

        } catch (err) {
            setApiError(err.response?.data?.detail || err.message || "Failed to verify OTP");
            toast.error("Invalid verification code or email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-0/50">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    Activate Account
                </CardTitle>
                <CardDescription>
                    Enter the 6-digit verification code sent to your email.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            readOnly={!!emailFromUrl}
                            className={`bg-gray-50 ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <div className="relative">
                            <Input
                                id="otp"
                                type="text"
                                maxLength={6}
                                {...register("otp")}
                                className={`pl-10 text-center tracking-widest text-lg ${errors.otp ? "border-red-500" : ""}`}
                            />
                        </div>
                        {errors.otp && (
                            <p className="text-sm text-red-500">{errors.otp.message}</p>
                        )}
                    </div>

                    {apiError && (
                        <div className="text-sm text-red-500 font-medium text-center">
                            {apiError}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Icon icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Activate Account"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
