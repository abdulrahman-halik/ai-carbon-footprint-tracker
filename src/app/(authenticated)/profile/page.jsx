import React from 'react';
import UserInfo from '@/features/profile/UserInfo';

export default function ProfilePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile & Settings</h1>
                <p className="text-gray-500 mt-2">Manage your personal information and environmental preferences.</p>
            </div>

            <UserInfo />
        </div>
    );
}
