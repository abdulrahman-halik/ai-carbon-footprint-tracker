"use client";

import React from "react";
import { Zap, Calendar, FileText, Settings, BarChart3 } from "lucide-react";
import { Modal, ModalContent } from "@/components/ui/Modal";

export function MeterForm({ reading, onReading, date, onDate, notes, onNotes, onCancel, onSave }) {
    return (
        <div className="space-y-5">
            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Meter Reading (kWh)
                </label>
                <input
                    type="number"
                    value={reading}
                    onChange={(e) => onReading(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm"
                    placeholder="e.g. 12452"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 shadow-sm"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Settings className="w-4 h-4 text-amber-500" />
                    Meter Type
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 shadow-sm appearance-none">
                    <option>Electric</option>
                    <option>Solar</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    Notes (optional)
                </label>
                <textarea
                    rows={3}
                    value={notes || ''}
                    onChange={(e) => onNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm resize-none"
                    placeholder="e.g. meter replaced, rooftop generation"
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium text-sm transition-colors">
                    Cancel
                </button>
                <button onClick={onSave} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    Save Reading
                </button>
            </div>
        </div>
    );
}

export function MeterPreview({ reading, date, readings = [] }) {
    return (
        <div className="space-y-5">
            <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    Live Preview
                </h4>
                <p className="text-xs text-gray-400 mt-1">Snapshot of the current reading</p>
            </div>

            {/* Current reading card */}
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                <div className="relative">
                    <div className="text-amber-100 text-xs font-medium uppercase tracking-wider">Current Reading</div>
                    <div className="text-4xl font-extrabold mt-1 tracking-tight">{reading || '--'}</div>
                    <div className="text-amber-200 text-sm mt-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        kWh &bull; {date || '—'}
                    </div>
                </div>
            </div>

            {/* Recent readings */}
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent History</div>
                <div className="space-y-2 max-h-44 overflow-auto pr-1">
                    {readings.length === 0 && (
                        <div className="text-center py-4 text-xs text-gray-300">No recent readings</div>
                    )}
                    {readings.slice(0, 5).map((r) => (
                        <div key={r.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                                </div>
                                <span className="text-sm text-gray-500">{r.date}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{r.reading} <span className="text-xs font-normal text-gray-400">kWh</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function MeterModal({ isOpen, onClose, reading, setReading, date, setDate, notes, setNotes, readings, onSave, savedToast }) {
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
