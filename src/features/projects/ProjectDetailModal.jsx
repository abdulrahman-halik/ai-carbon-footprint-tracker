import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Target, CheckCircle } from 'lucide-react';

export function ProjectDetailModal({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="w-full max-w-full sm:max-w-2xl">
                <div className="flex min-h-[20rem] max-h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-lg">
                    <div className="relative h-44 w-full bg-green-100 overflow-hidden sm:h-52">
                        {/* Placeholder for project image */}
                        <div className="absolute inset-0 bg-linear-to-br from-green-400 to-blue-500 opacity-30" />
                        <div className="absolute bottom-4 left-4 sm:left-6">
                            <Badge className="bg-white/90 text-green-800 hover:bg-white">{project.type}</Badge>
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
                        <div className="space-y-4 overflow-y-auto pr-1">
                            <div className="mb-4">
                                <ModalHeader className="mb-2">
                                    <ModalTitle className="text-2xl sm:text-3xl">{project.name}</ModalTitle>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                                        <MapPin size={16} />
                                        {project.location}
                                    </div>
                                </ModalHeader>
                                <ModalDescription className="text-base leading-relaxed text-gray-600">
                                    {project.description}
                                </ModalDescription>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2 text-gray-900 font-semibold">
                                        <Target size={18} className="text-primary" />
                                        Impact Goal
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{project.impactGoal}</p>
                                    <p className="text-xs text-gray-500">Tons of CO2 / Year</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2 text-gray-900 font-semibold">
                                        <CheckCircle size={18} className="text-primary" />
                                        Status
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{project.status}</p>
                                    <p className="text-xs text-gray-500">Verification Level</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.certifications.map((cert) => (
                                        <Badge key={cert} variant="outline" className="border-gray-200 text-gray-600">
                                            {cert}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ModalFooter className="mt-6 flex-none gap-2">
                            <Button variant="ghost" onClick={onClose}>Close</Button>
                            <Button>Support This Project</Button>
                        </ModalFooter>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
