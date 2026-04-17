"use client";

import React from "react";
import { Zap } from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/Modal";
import MeterForm from "@/features/energy/MeterForm";

export default function MeterModal({ isOpen, onClose, reading, setReading, date, setDate, readings, onSave, savedToast }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                <div className="bg-gradient-to-r from-amber-50 to-white rounded-t-2xl p-4 relative">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                            <Zap className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Add Meter Reading</h3>
                            <p className="text-sm text-gray-500">Enter a new meter reading to track your consumption over time.</p>
                        </div>
                    </div>
                    {savedToast && (
                        <div className="absolute right-4 top-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm shadow-sm animate-in fade-in">Saved</div>
                    )}
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <MeterForm reading={reading} onReading={setReading} date={date} onDate={setDate} onCancel={onClose} onSave={onSave} />
                    </div>
                    <div>
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700">Preview</h4>
                            <p className="text-xs text-gray-400">Quick snapshot of the saved reading and recent entries.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-gray-900">{reading || '--'}</div>
                            <div className="text-sm text-gray-500">kWh • {date || '—'}</div>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2">Recent readings</div>
                                <div className="space-y-2 max-h-40 overflow-auto">
                                    {readings.length === 0 && <div className="text-xs text-gray-400">No recent readings</div>}
                                    {readings.map((r) => (
                                        <div key={r.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                                            <div className="text-sm text-gray-700">{r.date}</div>
                                            <div className="text-sm font-semibold text-gray-900">{r.reading} kWh</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
