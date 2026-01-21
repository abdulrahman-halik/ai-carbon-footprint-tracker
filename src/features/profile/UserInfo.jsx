"use client";
import React, { useState } from 'react';
import { User, MapPin, Zap, Car, Leaf, Save, Shield, Trash2, Key } from 'lucide-react';

export default function UserInfo() {
    const [profile, setProfile] = useState({
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        ageGroup: '25-34',
        location: 'San Francisco, CA',
        vehicleType: 'Sedan (Petrol)',
        mpg: '28',
        commuteDistance: '15',
        electricityUsage: '350', // kWh
        dietType: 'Omnivore',
        householdSize: '2',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to update the user profile
        console.log("Saving profile:", profile);
    };

    return (
        <div className="space-y-8">
            {/* Profile Header Card */}
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <span className="text-4xl font-bold text-emerald-600">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-transform">
                        <User size={18} className="text-gray-600" />
                    </button>
                </div>

                <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-2">
                        <MapPin size={16} /> {profile.location}
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
                        : 'bg-white text-gray-700 boader border-gray-200 hover:bg-gray-50'
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
                            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
                                <span className="flex items-center gap-2"><Key size={16} /> Change Password</span>
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
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
                        <button className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-colors text-sm flex items-center justify-center gap-2">
                            <Trash2 size={16} /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, type = "text", disabled, ...props }) {
    return (
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                disabled={disabled}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900 placeholder-gray-400"
                {...props}
            />
        </div>
    );
}
