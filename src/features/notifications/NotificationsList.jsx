"use client";

import React from "react";
import NotificationListItem from "./NotificationListItem";

export default function NotificationsList({ notifications, onClear, onRemove }) {
    return (
        <div className="glass-card bg-white/85 border border-white/70 shadow-2xl rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Latest Notifications</h2>
                {notifications.length > 0 && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-xs font-semibold text-emerald-700 rounded-xl px-3 py-2 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">
                    No new notifications
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <NotificationListItem
                            key={notif.id}
                            notification={notif}
                            onRemove={() => onRemove(notif.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
