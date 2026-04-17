"use client";

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export default function EmissionItemModal({ isOpen, onClose, onSave, item }) {
    const [category, setCategory] = useState(item?.category || 'Custom');
    const [value, setValue] = useState(item?.value || 0);

    useEffect(() => {
        if (item) {
            setCategory(item.category || 'Custom');
            setValue(item.value || 0);
        } else if (!isOpen) {
            setCategory('Custom'); setValue(0);
        }
    }, [item, isOpen]);

    const handleSave = () => {
        const parsed = parseFloat(value) || 0;
        if (!category || parsed <= 0) return;
        onSave && onSave({ id: item?.id || Date.now(), category, value: parsed, color: item?.color || '#60A5FA' });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{item ? 'Edit' : 'Add'} Emission Item</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Value (kg)</label>
                            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleSave}>{item ? 'Save' : 'Add'}</Button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
