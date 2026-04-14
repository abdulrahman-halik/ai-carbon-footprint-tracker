"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";

const PasswordInput = ({ id, placeholder, className, leftIcon, ...props }) => {
    const [show, setShow] = useState(false);
    const [hasValue, setHasValue] = useState(!!(props.value || props.defaultValue));

    return (
        <div className="relative">
            {leftIcon && (
                <Icon
                    icon={leftIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                    size={18}
                />
            )}

            <Input
                {...props}
                id={id}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-10 ${leftIcon ? "pl-10" : ""} ${className}`}
                onChange={(e) => {
                    setHasValue(e.target.value.length > 0);
                    props.onChange?.(e);
                }}
            />

            {/* Only show eye button when field has text */}
            {hasValue && (  // 👈 add this condition
                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    <Icon icon={show ? EyeOff : Eye} size={18} />
                </button>
            )}
        </div>
    );
};
export default PasswordInput;