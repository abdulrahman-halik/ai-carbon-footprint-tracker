"use client";

import React, { useState, useMemo } from 'react';
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
        reader.onload = () => {
            setAvatar(reader.result);
        };
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
        setName(''); setEmail(''); setRole('Member'); setAvatar('');
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
            toast.success(`${newMember.name} updated`);
        } else if (onAdd) {
            onAdd(newMember);
            toast.success(`${newMember.name} added to the team`);
            if (!emailRegex.test(email.trim())) {
                toast((t) => (<span>Note: email normalized to <strong>{newMember.email}</strong></span>));
            }
        }
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-t-2xl p-5 text-white shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-lg shadow-sm">
                                <User className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Add Team Member</h3>
                                <p className="text-sm opacity-90">Invite a new teammate to collaborate on sustainability goals.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-32 h-32 rounded-full bg-white overflow-hidden flex items-center justify-center shadow-lg ring-4 ring-emerald-50">
                            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User className="text-emerald-300" size={48} />}
                        </div>
                        <label className="mt-4 w-full md:w-64 flex items-center gap-3 text-sm cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <div className="font-semibold text-gray-700">Upload profile photo</div>
                        </label>
                        <div className="mt-3 text-xs text-gray-500">Tip: leave blank to auto-generate avatar</div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-2 relative">
                                <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full px-4 py-3 mb-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 ${errors.name ? 'border-red-200 focus:ring-red-200' : ''}`} placeholder="e.g. Nithya Kevin" />
                                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-2 relative">
                                <Mail className="absolute left-6 top-3 text-gray-300" />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className={`pl-14 w-full px-4 py-3 mb-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200 ${errors.email ? 'border-red-200 focus:ring-red-200' : ''}`} placeholder="name@company.com" />
                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <div className="mt-2 relative">
                                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-200">
                                        <option>Member</option>
                                        <option>Manager</option>
                                        <option>Admin</option>
                                        <option>Owner</option>
                                        <option>Contributor</option>
                                        <option>Viewer</option>
                                        <option>Analyst</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-right">
                                <label className="text-sm text-gray-500">Status</label>
                                <div className="mt-2">
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 border rounded-xl shadow-sm">
                                        <option>Active</option>
                                        <option>In Progress</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3">
                            <button onClick={() => { reset(); onClose(); }} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">Cancel</button>
                            <button
                                aria-label={member ? 'Save member' : 'Add member'}
                                disabled={!valid}
                                onClick={handleAdd}
                                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-semibold shadow-lg transform transition duration-150 ease-in-out hover:scale-105 ${!valid ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-emerald-500 to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300`}
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>{member ? 'Save' : 'Add Member'}</span>
                            </button>
                        </div>

                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                            <div className="mt-3 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                                    {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User className="text-gray-300" />}
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
