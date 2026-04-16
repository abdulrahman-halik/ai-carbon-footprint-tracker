"use client";
import React from 'react';
import { Shield, Key, Trash2 } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/Modal';

/**
 * InputField helper — scoped to SecuritySettings modals
 */
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

/**
 * SecuritySettings — renders the Account Security sidebar card, Danger Zone,
 * and all three modals: Change Password, 2FA, Delete Account.
 *
 * @param {boolean}  twoFactorEnabled
 * @param {object}   passwordForm          - { current, new, confirm }
 * @param {string}   deleteInput
 * @param {boolean}  isPasswordModalOpen
 * @param {boolean}  is2FAModalOpen
 * @param {boolean}  isDeleteModalOpen
 * @param {Function} onPasswordFormChange  - (field, value) =>
 * @param {Function} onDeleteInputChange   - (value) =>
 * @param {Function} onOpenPasswordModal
 * @param {Function} onOpen2FAModal
 * @param {Function} onOpenDeleteModal
 * @param {Function} onClosePasswordModal
 * @param {Function} onClose2FAModal
 * @param {Function} onCloseDeleteModal
 * @param {Function} onChangePassword
 * @param {Function} onToggle2FA
 * @param {Function} onDeleteAccount
 */
export default function SecuritySettings({
    twoFactorEnabled,
    passwordForm,
    deleteInput,
    isPasswordModalOpen,
    is2FAModalOpen,
    isDeleteModalOpen,
    onPasswordFormChange,
    onDeleteInputChange,
    onOpenPasswordModal,
    onOpen2FAModal,
    onOpenDeleteModal,
    onClosePasswordModal,
    onClose2FAModal,
    onCloseDeleteModal,
    onChangePassword,
    onToggle2FA,
    onDeleteAccount,
}) {
    return (
        <>
            {/* Account Security card */}
            <div className="glass-card p-6 bg-gradient-to-b from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-gray-600" />
                    Account Security
                </h3>
                <div className="space-y-3">
                    <button onClick={onOpenPasswordModal} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2"><Key size={16} /> Change Password</span>
                    </button>
                    <button onClick={onOpen2FAModal} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2"><Shield size={16} /> 2FA Settings</span>
                    </button>
                </div>
            </div>

            {/* Danger Zone card */}
            <div className="glass-card p-6 border-red-100">
                <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">Danger Zone</h3>
                <p className="text-xs text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button onClick={onOpenDeleteModal} className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-colors text-sm flex items-center justify-center gap-2">
                    <Trash2 size={16} /> Delete Account
                </button>
            </div>

            {/* Change Password Modal */}
            <Modal isOpen={isPasswordModalOpen} onClose={onClosePasswordModal}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Change Password</ModalTitle>
                        <ModalDescription>Update your existing password to maintain account security.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6 space-y-4">
                        <InputField type="password" label="Current Password" value={passwordForm.current} onChange={(e) => onPasswordFormChange('current', e.target.value)} />
                        <InputField type="password" label="New Password" value={passwordForm.new} onChange={(e) => onPasswordFormChange('new', e.target.value)} />
                        <InputField type="password" label="Confirm New Password" value={passwordForm.confirm} onChange={(e) => onPasswordFormChange('confirm', e.target.value)} />
                    </div>
                    <ModalFooter>
                        <button onClick={onClosePasswordModal} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
                        <button onClick={onChangePassword} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium">Update Password</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* 2FA Modal */}
            <Modal isOpen={is2FAModalOpen} onClose={onClose2FAModal}>
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
                            <button onClick={onToggle2FA} className={`px-4 py-2 rounded-xl font-medium transition-colors ${twoFactorEnabled ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                                {twoFactorEnabled ? "Disable" : "Enable"}
                            </button>
                        </div>
                    </div>
                    <ModalFooter>
                        <button onClick={onClose2FAModal} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Close</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Account Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle className="text-red-600">Delete Account</ModalTitle>
                        <ModalDescription>This action is irreversible. All your data will be permanently deleted.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-700 font-medium">Please type <span className="font-bold text-red-600">DELETE</span> to confirm you want to proceed.</p>
                        <InputField label="" value={deleteInput} onChange={(e) => onDeleteInputChange(e.target.value)} placeholder="Type DELETE here..." />
                    </div>
                    <ModalFooter>
                        <button onClick={onCloseDeleteModal} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
                        <button onClick={onDeleteAccount} disabled={deleteInput !== 'DELETE'} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                            Permanently Delete
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
