"use client";
import React from 'react';
import { User, MapPin, Save } from 'lucide-react';

/**
 * ProfileHeader — displays the user's avatar, name, location, level badges
 * and the Edit / Save toggle button.
 *
 * @param {object}   profile     - Current profile data
 * @param {boolean}  isEditing   - Whether the user is in edit mode
 * @param {Function} onEdit      - Called when Edit button is clicked
 * @param {Function} onSave      - Called when Save Changes is clicked
 * @param {Function} onImageUpload - File input change handler
 */
export default function ProfileHeader({ profile, isEditing, onEdit, onSave, onImageUpload }) {
    return (
        <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
            {/* Avatar */}
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
                <input
                    type="file"
                    id="profile-pic-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageUpload}
                    disabled={!isEditing}
                />
            </div>

            {/* Name / location / badges */}
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

            {/* Edit / Save */}
            <button
                onClick={() => isEditing ? onSave() : onEdit()}
                className={`px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2 ${isEditing
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
            >
                {isEditing ? <><Save size={18} /> Save Changes</> : 'Edit Profile'}
            </button>
        </div>
    );
}
