"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { notificationsSeed } from "./notificationsData";

export default function NotificationBell() {
    const [notifications] = useState(notificationsSeed);
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/notifications")}
            className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all relative"
            aria-label="Open notifications"
        >
            <Bell size={24} />
            {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
        </button>
    );
}
