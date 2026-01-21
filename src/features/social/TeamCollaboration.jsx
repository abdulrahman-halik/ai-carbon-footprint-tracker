import React from "react";
import { Plus, User } from "lucide-react";

export function TeamCollaboration() {
    const teamMembers = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Sustainability Manager",
            task: "Working on Carbon Reduction Initiative",
            status: "Active",
            statusColor: "bg-yellow-100 text-yellow-700",
            avatar: "https://i.pravatar.cc/150?u=sarah",
        },
        {
            id: 2,
            name: "Mike Rodriguez",
            role: "Energy Analyst",
            task: "Working on Solar Panel Installation",
            status: "In Progress",
            statusColor: "bg-blue-100 text-blue-700",
            avatar: "https://i.pravatar.cc/150?u=mike",
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Team Collaboration</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus size={16} />
                    Add Member
                </button>
            </div>

            <div className="space-y-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{member.task}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.statusColor}`}>
                            {member.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
