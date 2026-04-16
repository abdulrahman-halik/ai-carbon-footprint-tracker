"use client";
import React from 'react';
import { User, Car, Zap } from 'lucide-react';

/**
 * ProfileForms — renders the three editable lifestyle form cards:
 *   1. Personal Details (name, email, age group, location)
 *   2. Transport & Commute (vehicle type, commute distance, MPG)
 *   3. Energy & Lifestyle (electricity, household size, diet)
 *
 * @param {object}   profile    - Current profile state
 * @param {boolean}  isEditing  - Whether form fields are enabled
 * @param {Function} onChange   - Generic field change handler
 */
export default function ProfileForms({ profile, isEditing, onChange }) {
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User size={20} className="text-emerald-600" />
                    Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="name" value={profile.name} onChange={onChange} disabled={!isEditing} />
                    <InputField label="Email" name="email" value={profile.email} onChange={onChange} disabled={true} />
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                        <select
                            name="ageGroup"
                            value={profile.ageGroup}
                            onChange={onChange}
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
                    <InputField label="Location" name="location" value={profile.location} onChange={onChange} disabled={!isEditing} />
                </div>
            </div>

            {/* Transport & Commute */}
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Car size={20} className="text-indigo-600" />
                    Transport &amp; Commute
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Vehicle</label>
                        <select
                            name="vehicleType"
                            value={profile.vehicleType}
                            onChange={onChange}
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
                    <InputField label="Daily Commute (km)" name="commuteDistance" type="number" value={profile.commuteDistance} onChange={onChange} disabled={!isEditing} />
                    <InputField label="Vehicle MPG (approx)" name="mpg" type="number" value={profile.mpg} onChange={onChange} disabled={!isEditing} />
                </div>
            </div>

            {/* Energy & Lifestyle */}
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Zap size={20} className="text-amber-500" />
                    Energy &amp; Lifestyle
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Monthly Electricity (kWh)" name="electricityUsage" type="number" value={profile.electricityUsage} onChange={onChange} disabled={!isEditing} />
                    <InputField label="Household Size" name="householdSize" type="number" value={profile.householdSize} onChange={onChange} disabled={!isEditing} />
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Diet Preference</label>
                        <select
                            name="dietType"
                            value={profile.dietType}
                            onChange={onChange}
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
    );
}

// ---------------------------------------------------------------------------
// Local helper — scoped to ProfileForms (not globally shared)
// ---------------------------------------------------------------------------
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
