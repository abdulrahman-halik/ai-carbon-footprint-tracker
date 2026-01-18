"use client";

import { useState } from "react";
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
import Icon from "@/components/Icon";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "./authSchemas";

export default function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setErrors({});

        // Validate form data
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            // flatten().fieldErrors returns arrays, we want strings
            const formattedErrors = {};
            for (const key in fieldErrors) {
                formattedErrors[key] = fieldErrors[key][0];
            }
            setErrors(formattedErrors);
            return;
        }

        setLoading(true);

        try {
            await login(formData);
            router.push("/dashboard"); // Redirect to dashboard after login
        } catch (err) {
            setError(err.message || "Failed to login");
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                                required
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Icon
                                icon={Lock}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                            />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    {error && (
                        <div className="text-sm text-red-500 font-medium">
                            {error}
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
