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
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "./authSchemas";
import { toast } from "react-hot-toast";

export default function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setApiError("");
        setLoading(true);

        try {
            const user = await login(data);
            toast.success(`Welcome back, ${user.name || "User"} 👋`);
            router.push("/dashboard");
        } catch (err) {
            setApiError(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-0/50">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    Welcome back
                </CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                    {apiError && (
                        <div className="text-sm text-red-500 font-medium">
                            {apiError}
                        </div>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Icon icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-500">
                <div>
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
                <Link href="/forgot-password" className="text-xs hover:underline">
                    Forgot your password?
                </Link>
            </CardFooter>
        </Card>
    );
}

