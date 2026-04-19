"use client";

import React from 'react';
import { Users, Clock, CheckCircle, Zap } from 'lucide-react';

export default function TeamSidebar({ members = [] }) {
  const total = members.length;
  const active = members.filter(m => m.status === 'Active').length;
  const inProgress = members.filter(m => m.status === 'In Progress').length;
  const inactive = members.filter(m => m.status === 'Inactive').length;

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Team Snapshot</h3>
          <p className="text-sm text-gray-500">Quick overview of your team's activity</p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg">
          <Users className="text-emerald-600" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500">Members</div>
          <div className="text-2xl font-extrabold text-gray-900">{total}</div>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500">Active</div>
          <div className="text-2xl font-extrabold text-emerald-600">{active}</div>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500">In progress</div>
          <div className="text-2xl font-extrabold text-amber-600">{inProgress}</div>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500">Inactive</div>
          <div className="text-2xl font-extrabold text-gray-500">{inactive}</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-800">Recent Activity</h4>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Mission milestone reached</div>
              <div className="text-xs text-gray-500">2 days ago</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">New project added</div>
              <div className="text-xs text-gray-500">4 days ago</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
