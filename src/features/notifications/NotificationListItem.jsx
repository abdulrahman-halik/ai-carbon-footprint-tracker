"use client";

import React from "react";
import { X } from "lucide-react";
import NotificationIcon from "./NotificationIcon";

export default function NotificationListItem({ notification, onRemove }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex gap-3 items-start">
            <div className="mt-0.5 p-1.5 rounded-full bg-gray-100 shrink-0">
                <NotificationIcon type={notification.type} size={16} />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-800 leading-snug">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
            <button
                type="button"
                onClick={onRemove}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove notification"
            >
                <X size={14} />
            </button>
        </div>
    );
}
