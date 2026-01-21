"use client";
import React, { useState } from 'react';
import { Bell, AlertTriangle, Lightbulb, CheckCircle, X } from 'lucide-react';

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'alert', message: 'High electricity usage detected this week.', time: '2h ago' },
        { id: 2, type: 'tip', message: 'Tip: Switch to cold water laundry to save energy.', time: '5h ago' },
        { id: 3, type: 'success', message: 'Goal achieved: 50km cycling this month!', time: '1d ago' },
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'alert': return <AlertTriangle size={16} className="text-amber-500" />;
            case 'tip': return <Lightbulb size={16} className="text-blue-500" />;
            case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
            default: return <Bell size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all relative"
            >
                <Bell size={24} />
                {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            <span className="text-xs text-emerald-600 font-medium px-2 py-0.5 rounded-full bg-emerald-50">
                                {notifications.length} New
                            </span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No new notifications
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 items-start">
                                        <div className="mt-0.5 p-1.5 rounded-full bg-gray-100 shrink-0">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800 leading-snug">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setNotifications(prev => prev.filter(n => n.id !== notif.id));
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        {notifications.length > 0 && (
                            <div className="p-2 border-t border-gray-50 bg-gray-50">
                                <button
                                    onClick={() => setNotifications([])}
                                    className="w-full py-2 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                >
                                    Mark all as read
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
