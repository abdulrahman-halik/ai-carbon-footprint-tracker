"use client";

import React, { useState } from "react";
import { notificationsSeed } from "./notificationsData";
import NotificationsHero from "./NotificationsHero";
import NotificationsList from "./NotificationsList";

export default function NotificationsHub() {
    const [notifications, setNotifications] = useState(notificationsSeed);

    return (
        <div className="relative space-y-8 max-w-4xl mx-auto pb-10">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            <NotificationsHero />
            <NotificationsList
                notifications={notifications}
                onClear={() => setNotifications([])}
                onRemove={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
            />
        </div>
    );
}
