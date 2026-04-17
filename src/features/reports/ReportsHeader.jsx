"use client";

import React from 'react';
import { FileText } from 'lucide-react';

export default function ReportsHeader() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="text-indigo-500" size={32} />
                Impact Reports
            </h1>
            <p className="text-gray-500 mt-1">Download your monthly sustainability summaries and certificates.</p>
        </div>
    );
}
