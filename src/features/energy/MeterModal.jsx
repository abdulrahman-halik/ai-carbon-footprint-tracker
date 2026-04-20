"use client";

import React from "react";
import { Zap } from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/Modal";
import MeterForm from "@/features/energy/MeterForm";
import MeterPreview from "@/features/energy/MeterPreview";

export default function MeterModal({ isOpen, onClose, reading, setReading, date, setDate, notes, setNotes, readings, onSave, savedToast }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-t-2xl p-6 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Add Meter Reading</h3>
                                <p className="text-amber-100 text-sm mt-0.5">Track your consumption over time</p>
                            </div>
                        </div>
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
                        <MeterForm reading={reading} onReading={setReading} date={date} onDate={setDate} notes={notes} onNotes={setNotes} onCancel={onClose} onSave={onSave} />
                    </div>
                    <div>
                        <MeterPreview reading={reading} date={date} readings={readings} />
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
