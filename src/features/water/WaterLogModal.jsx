"use client";
import React from 'react';
import { Droplets, X } from 'lucide-react';
import { Modal, ModalContent } from '@/components/ui/Modal';
import LogForm from './LogForm';
import RecentEntries from './RecentEntries';

export default function WaterLogModal({ isOpen, onClose, savedToast, liters, setLiters, date, setDate, onSave, logs, onEdit, onDelete, editingId }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 rounded-t-2xl p-6 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                                <Droplets className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Log Water Usage</h3>
                                <p className="text-sky-100 text-sm mt-0.5">Track your daily consumption trends</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {savedToast && (
                        <div className="absolute right-4 bottom-3 bg-white text-emerald-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg animate-in fade-in">
                            ✓ Saved!
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50">
                    <div>
                        <LogForm liters={liters} onLiters={setLiters} date={date} onDate={setDate} onCancel={onClose} onSave={onSave} />
                    </div>
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-700">Recent Entries</h4>
                                <p className="text-xs text-gray-400">Last {logs.length || 0} entries</p>
                            </div>
                            <div className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full">{logs.reduce((s, it) => s + (it.liters || 0), 0)} L</div>
                        </div>

                        <RecentEntries items={logs} onEdit={onEdit} onDelete={onDelete} editingId={editingId} onCancel={onClose} />
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
