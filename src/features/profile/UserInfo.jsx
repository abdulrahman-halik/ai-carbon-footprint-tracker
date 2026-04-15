"use client";
import React, { useState, useEffect } from 'react';
import { User, MapPin, Zap, Car, Leaf, Save, Shield, Trash2, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import mockApi from '@/mockApi';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/Modal';

export default function UserInfo() {
    const { user } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        ageGroup: '25-34',
        location: 'San Francisco, CA',
        vehicleType: 'Sedan (Petrol)',
        mpg: '28',
        commuteDistance: '15',
        electricityUsage: '350', // kWh
        dietType: 'Omnivore',
        householdSize: '2',
        profilePicture: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Modal States
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form States
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');

    // Status States
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');

    useEffect(() => {
        // Mock data loading
        const loadProfile = () => {
            if (user) {
                const savedProfile = localStorage.getItem('onboarding_profile');
                const profileData = savedProfile ? JSON.parse(savedProfile) : {};
                const userJson = localStorage.getItem('user');
                const userObj = userJson ? JSON.parse(userJson) : {};

                setProfile(prev => ({
                    ...prev,
                    name: user.name || prev.name,
                    email: user.email || prev.email,
                    ...profileData
                }));

                if (userObj.twoFactorEnabled) {
                    setTwoFactorEnabled(true);
                }
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setApiError('');
            setApiSuccess('');
            await mockApi.updateProfile(profile);
            setIsEditing(false);
            setApiSuccess('Profile updated successfully');
            setTimeout(() => setApiSuccess(''), 3000);
        } catch (error) {
            setApiError("Failed to save profile");
        }
    };

    const handleChangePassword = async () => {
        try {
            setApiError('');
            setApiSuccess('');
            if (passwordForm.new !== passwordForm.confirm) throw new Error("Passwords do not match");
            await mockApi.changePassword(passwordForm.current, passwordForm.new);
            setIsPasswordModalOpen(false);
            setPasswordForm({ current: '', new: '', confirm: '' });
            setApiSuccess("Password changed successfully");
            setTimeout(() => setApiSuccess(''), 3000);
        } catch (error) {
            setApiError(error.message || "Failed to change password");
        }
    };

    const handleToggle2FA = async () => {
        try {
            setApiError('');
            setApiSuccess('');
            const newState = !twoFactorEnabled;
            await mockApi.toggle2FA(newState);
            setTwoFactorEnabled(newState);
            setIs2FAModalOpen(false);
            setApiSuccess(`2FA ${newState ? 'enabled' : 'disabled'} successfully`);
            setTimeout(() => setApiSuccess(''), 3000);
        } catch (error) {
            setApiError('Failed to update 2FA settings');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setApiError('');
            if (deleteInput !== 'DELETE') throw new Error("Type DELETE to confirm");
            await mockApi.deleteAccount();
            router.push('/');
        } catch (error) {
            setApiError(error.message || "Failed to delete account");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {apiSuccess && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 size={20} />
                    {apiSuccess}
                </div>
            )}
            {apiError && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 border border-red-200">
                    <AlertCircle size={20} />
                    {apiError}
                </div>
            )}

            {/* Profile Header Card */}
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {profile.profilePicture ? (
                                <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-emerald-600">
                                    {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'U'}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => isEditing && document.getElementById('profile-pic-upload').click()}
                        className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg border border-gray-100 transition-transform ${isEditing ? 'bg-emerald-100 hover:scale-110 cursor-pointer' : 'bg-white cursor-default'}`}
                        title={isEditing ? "Upload new profile picture" : ""}
                    >
                        <User size={18} className={isEditing ? "text-emerald-600" : "text-gray-600"} />
                    </button>
                    <input type="file" id="profile-pic-upload" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={!isEditing} />
                </div>

                <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">{profile.name || "User Name"}</h2>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-2">
                        <MapPin size={16} /> {profile.location || "Location not set"}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium border border-emerald-200">
                            Level 5 Eco-Warrior
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200">
                            Top 10% in Neighborhood
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2 ${isEditing
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {isEditing ? <><Save size={18} /> Save Changes</> : 'Edit Profile'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User size={20} className="text-emerald-600" />
                            Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
                            <InputField label="Email" name="email" value={profile.email} onChange={handleChange} disabled={true} /> {/* Email usually requires specific flow to change */}
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                                <select
                                    name="ageGroup"
                                    value={profile.ageGroup}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60"
                                >
                                    <option>Under 18</option>
                                    <option>18-24</option>
                                    <option>25-34</option>
                                    <option>35-44</option>
                                    <option>45-54</option>
                                    <option>55+</option>
                                </select>
                            </div>
                            <InputField label="Location" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} />
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Car size={20} className="text-indigo-600" />
                            Transport & Commute
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Vehicle</label>
                                <select
                                    name="vehicleType"
                                    value={profile.vehicleType}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60"
                                >
                                    <option>Sedan (Petrol)</option>
                                    <option>Sedan (Diesel)</option>
                                    <option>SUV (Petrol)</option>
                                    <option>SUV (Diesel)</option>
                                    <option>Hybrid</option>
                                    <option>Electric Vehicle (EV)</option>
                                    <option>Motorcycle</option>
                                    <option>None / Public Transport</option>
                                </select>
                            </div>
                            <InputField label="Daily Commute (km)" name="commuteDistance" type="number" value={profile.commuteDistance} onChange={handleChange} disabled={!isEditing} />
                            <InputField label="Vehicle MPG (approx)" name="mpg" type="number" value={profile.mpg} onChange={handleChange} disabled={!isEditing} />
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Zap size={20} className="text-amber-500" />
                            Energy & Lifestyle
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Monthly Electricity (kWh)" name="electricityUsage" type="number" value={profile.electricityUsage} onChange={handleChange} disabled={!isEditing} />
                            <InputField label="Household Size" name="householdSize" type="number" value={profile.householdSize} onChange={handleChange} disabled={!isEditing} />
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Diet Preference</label>
                                <select
                                    name="dietType"
                                    value={profile.dietType}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60"
                                >
                                    <option>Omnivore</option>
                                    <option>Pescatarian</option>
                                    <option>Vegetarian</option>
                                    <option>Vegan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="glass-card p-6 bg-gradient-to-b from-gray-50 to-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield size={18} className="text-gray-600" />
                            Account Security
                        </h3>
                        <div className="space-y-3">
                            <button onClick={() => setIsPasswordModalOpen(true)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
                                <span className="flex items-center gap-2"><Key size={16} /> Change Password</span>
                            </button>
                            <button onClick={() => setIs2FAModalOpen(true)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
                                <span className="flex items-center gap-2"><Shield size={16} /> 2FA Settings</span>
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-red-100">
                        <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                            Danger Zone
                        </h3>
                        <p className="text-xs text-red-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-colors text-sm flex items-center justify-center gap-2">
                            <Trash2 size={16} /> Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Change Password</ModalTitle>
                        <ModalDescription>Update your existing password to maintain account security.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6 space-y-4">
                        <InputField type="password" label="Current Password" value={passwordForm.current} onChange={(e) => setPasswordForm(p => ({ ...p, current: e.target.value }))} />
                        <InputField type="password" label="New Password" value={passwordForm.new} onChange={(e) => setPasswordForm(p => ({ ...p, new: e.target.value }))} />
                        <InputField type="password" label="Confirm New Password" value={passwordForm.confirm} onChange={(e) => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} />
                    </div>
                    <ModalFooter>
                        <button onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
                        <button onClick={handleChangePassword} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium">Update Password</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={is2FAModalOpen} onClose={() => setIs2FAModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Two-Factor Authentication</ModalTitle>
                        <ModalDescription>Add an extra layer of security to your account.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6 space-y-4 text-sm text-gray-600">
                        <p>When 2FA is enabled, logging in requires both your password and a security code.</p>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div>
                                <h4 className="font-semibold text-gray-900">Current Status</h4>
                                <p className={twoFactorEnabled ? "text-emerald-600 font-medium" : "text-gray-500"}>
                                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                                </p>
                            </div>
                            <button onClick={handleToggle2FA} className={`px-4 py-2 rounded-xl font-medium transition-colors ${twoFactorEnabled ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                                {twoFactorEnabled ? "Disable" : "Enable"}
                            </button>
                        </div>
                    </div>
                    <ModalFooter>
                        <button onClick={() => setIs2FAModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Close</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle className="text-red-600">Delete Account</ModalTitle>
                        <ModalDescription>This action is irreversible. All your data will be permanently deleted.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-700 font-medium">Please type <span className="font-bold text-red-600">DELETE</span> to confirm you want to proceed.</p>
                        <InputField label="" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} placeholder="Type DELETE here..." />
                    </div>
                    <ModalFooter>
                        <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
                        <button onClick={handleDeleteAccount} disabled={deleteInput !== 'DELETE'} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">Permanently Delete</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

function InputField({ label, type = "text", disabled, ...props }) {
    return (
        <div className="form-group">
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <input
                type={type}
                disabled={disabled}
                className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900 placeholder-gray-400 ${props.className || ''}`}
                {...props}
            />
        </div>
    );
}
