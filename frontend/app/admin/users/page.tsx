'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const users = [
  { name: 'Admin User', email: 'admin@herbnexus.org', role: 'ADMIN', active: true, created: '2022-01-15' },
  { name: 'Expert Botanist', email: 'expert@herbnexus.org', role: 'EXPERT', active: true, created: '2022-03-22' },
  { name: 'Research Scientist', email: 'researcher@herbnexus.org', role: 'RESEARCHER', active: true, created: '2023-05-10' },
  { name: 'Field Observer', email: 'observer@herbnexus.org', role: 'OBSERVER', active: true, created: '2023-11-05' },
  { name: 'Conservation Auth', email: 'conservation@herbnexus.org', role: 'CONSERVATION_AUTHORITY', active: true, created: '2024-02-18' },
  { name: 'Public User', email: 'public@herbnexus.org', role: 'PUBLIC', active: false, created: '2025-01-30' },
];

export default function UserManagement() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-2">Manage roles, permissions, and account statuses.</p>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search users..." className="border rounded-md px-3 py-2 text-sm w-64" />
          <Button>Search</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <select 
                        defaultValue={user.role} 
                        className="bg-white border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                      >
                        <option value="PUBLIC">PUBLIC</option>
                        <option value="OBSERVER">OBSERVER</option>
                        <option value="EXPERT">EXPERT</option>
                        <option value="RESEARCHER">RESEARCHER</option>
                        <option value="CONSERVATION_AUTHORITY">CONSERVATION_AUTH</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center h-full">
                        <Switch checked={user.active} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.created}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">Save</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
