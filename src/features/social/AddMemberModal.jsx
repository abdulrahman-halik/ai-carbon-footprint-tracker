"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { X, User, Mail, Briefcase, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddMemberModal({ isOpen, onClose, onAdd, member, onSave }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Member');
    const [status, setStatus] = useState('Active');
    const [avatar, setAvatar] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { setAvatar(reader.result); };
        reader.readAsDataURL(file);
    };

    const errors = useMemo(() => {
        const e = {};
        if (name.trim().length <= 1) e.name = 'Please enter a full name (at least 2 characters)';
        if (!email.trim()) e.email = 'Email is required';
        else if (!emailRegex.test(email.trim())) e.email = 'Enter a valid email address (e.g. name@company.com)';
        return e;
    }, [name, email]);

    const valid = useMemo(() => Object.keys(errors).length === 0, [errors]);

    const reset = () => {
        setName(''); setEmail(''); setRole('Member'); setStatus('Active'); setAvatar('');
    };

    React.useEffect(() => {
        if (member) {
            setName(member.name || '');
            setEmail(member.email || '');
            setRole(member.role || 'Member');
            setStatus(member.status || 'Active');
            setAvatar(member.avatar || '');
        } else if (!isOpen) {
            reset();
        }
    }, [member, isOpen]);

    const handleAdd = () => {
        if (!valid) {
            toast.error('Please provide a valid name and email');
            return;
        }

        const normalizedEmail = emailRegex.test(email.trim()) ? email.trim() : `${email.trim()}@example.com`;
        const statusColorMap = {
            'Active': 'bg-emerald-100 text-emerald-700',
            'Inactive': 'bg-gray-100 text-gray-500',
            'In Progress': 'bg-amber-100 text-amber-700',
        };

        const newMember = {
            id: (member && member.id) ? member.id : Date.now(),
            name: name.trim(),
            role,
            task: (member && member.task) ? member.task : 'No task yet',
            status: status || ((member && member.status) ? member.status : 'Active'),
            statusColor: statusColorMap[status || (member && member.status) || 'Active'],
            avatar: avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(normalizedEmail)}`,
            email: normalizedEmail,
        };

        if (member && member.id && onSave) {
            onSave(newMember);
        } else if (onAdd) {
            onAdd(newMember);
        }
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="w-full max-w-3xl mx-4 sm:mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-t-2xl p-4 sm:p-5 text-white shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg shadow-sm shrink-0">
                            <User className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold">
                                {member ? 'Edit Team Member' : 'Add Team Member'}
                            </h3>
                            <p className="text-sm opacity-90">Invite a new teammate to collaborate on sustainability goals.</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
                    {/* Avatar upload */}
                    <div className="flex flex-col items-center">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white overflow-hidden flex items-center justify-center shadow-lg ring-4 ring-emerald-50">
                            {avatar ? (
                                <div className="relative w-full h-full">
                                    <Image src={avatar} alt={name} fill className="object-cover" />
                                </div>
                            ) : (
                                <User className="text-emerald-300" size={48} />
                            )}
                        </div>
                        <label className="mt-4 flex items-center gap-2 text-sm cursor-pointer text-center">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <div className="font-semibold text-gray-700 hover:text-emerald-600 transition-colors">Upload profile photo</div>
                        </label>
                        <div className="mt-2 text-xs text-gray-500 text-center">Tip: leave blank to auto-generate avatar</div>
                    </div>

                    {/* Form fields */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'}`}
                                    placeholder="e.g. Nithya Kevin"
                                />
                                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-2 relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-300 w-4 h-4" />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`pl-10 w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'}`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Role + Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none bg-white"
                                >
                                    <option>Member</option>
                                    <option>Manager</option>
                                    <option>Admin</option>
                                    <option>Owner</option>
                                    <option>Contributor</option>
                                    <option>Viewer</option>
                                    <option>Analyst</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none bg-white"
                                >
                                    <option>Active</option>
                                    <option>In Progress</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
                            <button
                                onClick={() => { reset(); onClose(); }}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                aria-label={member ? 'Save member' : 'Add member'}
                                disabled={!valid}
                                onClick={handleAdd}
                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold shadow-lg transform transition duration-150 ease-in-out hover:scale-105 ${!valid ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-emerald-500 to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300`}
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>{member ? 'Save' : 'Add Member'}</span>
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                            <div className="mt-3 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-white relative border border-gray-100 flex items-center justify-center">
                                    {avatar ? (
                                        <Image src={avatar} alt={name} fill className="object-cover" />
                                    ) : (
                                        <User className="text-gray-300" size={24} />
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{name || 'New Member'}</div>
                                    <div className="text-xs text-gray-500">{email || 'email@company.com'}</div>
                                    <div className="mt-1 text-xs text-emerald-700 font-medium">{role}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}