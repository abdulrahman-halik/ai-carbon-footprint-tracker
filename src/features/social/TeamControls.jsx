"use client";

import React from 'react';

export default function TeamControls({ query, setQuery, filter, setFilter }) {
  return (
    <div className="mt-4 mb-6 flex items-center gap-4">
      <div className="flex-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search team members or roles"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-500">Filter:</div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg shadow-sm bg-white">
          <option>All</option>
          <option>Active</option>
          <option>In Progress</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  );
}
