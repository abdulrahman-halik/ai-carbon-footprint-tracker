"use client";

import React from "react";
import { AlertTriangle, Lightbulb, CheckCircle, Bell } from "lucide-react";

export default function NotificationIcon({ type, size = 16 }) {
    switch (type) {
        case "alert":
            return <AlertTriangle size={size} className="text-amber-500" />;
        case "tip":
            return <Lightbulb size={size} className="text-blue-500" />;
        case "success":
            return <CheckCircle size={size} className="text-emerald-500" />;
        default:
            return <Bell size={size} className="text-gray-500" />;
    }
}
