"use client";
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import authService from '@/services/authService';
import userService from '@/services/userService';
import ProfileHeader from './ProfileHeader';
import ProfileForms from './ProfileForms';
import SecuritySettings from './SecuritySettings';

/**
 * UserInfo — Profile & Settings page orchestrator.
 * All UI is delegated to ProfileHeader, ProfileForms, and SecuritySettings.
 * This file is responsible only for state management and API calls.
 */
export default function UserInfo() {
    const { user } = useAuth();
    const router = useRouter();

    const [profile, setProfile] = useState({
        name: '', email: '', ageGroup: '25-34', location: 'San Francisco, CA',
        vehicleType: 'Sedan (Petrol)', mpg: '28', commuteDistance: '15',
        electricityUsage: '350', dietType: 'Omnivore', householdSize: '2', profilePicture: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Security modal state
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');

    // Feedback banners
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');

    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem('onboarding_profile');
            const userObj = JSON.parse(localStorage.getItem('user') || '{}');
            setProfile(prev => ({ ...prev, name: user.name || prev.name, email: user.email || prev.email, ...(saved ? JSON.parse(saved) : {}) }));
            if (userObj.twoFactorEnabled) setTwoFactorEnabled(true);
            setIsLoading(false);
        }
    }, [user]);

    const flash = (setter, msg) => { setter(msg); setTimeout(() => setter(''), 3000); };

    const handleSave = async () => {
        try {
            setApiError('');
            await userService.updateProfile(profile);
            setIsEditing(false);
            flash(setApiSuccess, 'Profile updated successfully');
        } catch { setApiError('Failed to save profile'); }
    };

    const handleChangePassword = async () => {
        try {
            setApiError('');
            if (passwordForm.new !== passwordForm.confirm) throw new Error('Passwords do not match');
            await userService.changePassword(
                passwordForm.current,
                passwordForm.new
            );
            setIsPasswordModalOpen(false);
            setPasswordForm({ current: '', new: '', confirm: '' });
            toast.success('Password updated successfully');
        } catch (e) { setApiError(e.message || 'Failed to change password'); }
    };

    const handleToggle2FA = async () => {
        try {
            setApiError('');
            const next = !twoFactorEnabled;
            await userService.toggle2FA(next);
            setTwoFactorEnabled(next);
            setIs2FAModalOpen(false);
            flash(setApiSuccess, `2FA ${next ? 'enabled' : 'disabled'} successfully`);
        } catch { setApiError('Failed to update 2FA settings'); }
    };

    const handleDeleteAccount = async () => {
        try {
            setApiError('');
            if (deleteInput !== 'DELETE') throw new Error('Type DELETE to confirm');
            await userService.deleteAccount();
            router.push('/');
        } catch (e) { setApiError(e.message || 'Failed to delete account'); }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {apiSuccess && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 size={20} /> {apiSuccess}
                </div>
            )}
            {apiError && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 border border-red-200">
                    <AlertCircle size={20} /> {apiError}
                </div>
            )}

            <ProfileHeader
                profile={profile}
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onSave={handleSave}
                onImageUpload={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => setProfile(p => ({ ...p, profilePicture: reader.result }));
                    reader.readAsDataURL(file);
                }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ProfileForms
                    profile={profile}
                    isEditing={isEditing}
                    onChange={(e) => setProfile(p => ({ ...p, [e.target.name]: e.target.value }))}
                />
                <div className="space-y-6">
                    <SecuritySettings
                        twoFactorEnabled={twoFactorEnabled}
                        passwordForm={passwordForm}
                        deleteInput={deleteInput}
                        isPasswordModalOpen={isPasswordModalOpen}
                        is2FAModalOpen={is2FAModalOpen}
                        isDeleteModalOpen={isDeleteModalOpen}
                        onPasswordFormChange={(field, val) => setPasswordForm(p => ({ ...p, [field]: val }))}
                        onDeleteInputChange={setDeleteInput}
                        onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
                        onOpen2FAModal={() => setIs2FAModalOpen(true)}
                        onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
                        onClosePasswordModal={() => setIsPasswordModalOpen(false)}
                        onClose2FAModal={() => setIs2FAModalOpen(false)}
                        onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
                        onChangePassword={handleChangePassword}
                        onToggle2FA={handleToggle2FA}
                        onDeleteAccount={handleDeleteAccount}
                    />
                </div>
            </div>
        </div>
    );
}
