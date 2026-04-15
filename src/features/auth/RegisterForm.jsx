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
import PasswordInput from "@/components/ui/PasswordInput";
import Icon from "@/components/ui/Icon";
import { Mail, Lock, User, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "./authSchemas";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
    const { register: authRegister } = useAuth();
    const router = useRouter();
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {
        setApiError("");
        setLoading(true);

        try {
            const user = await authRegister({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            toast.success(`Welcome back, ${user.name || "User"} 👋`);
            router.push("/dashboard");
        } catch (err) {
            setApiError(err.message || "Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-0/50">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    Create an account
                </CardTitle>
                <CardDescription>
                    Join us to track your carbon footprint
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <Icon
                                icon={User}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                            />
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name")}
                                className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
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
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={Lock}
                            {...register("password")}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <PasswordInput
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={CheckCircle}
                            {...register("confirmPassword")}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
                <div>
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}

