'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const threats = [
  { title: 'Logging in core zone', type: 'Deforestation', severity: 'CRITICAL', status: 'PENDING', reporter: 'conservation@herbnexus.org', date: '2026-08-10' },
  { title: 'Suspicious gathering', type: 'Illegal Collection', severity: 'HIGH', status: 'VERIFIED', reporter: 'expert@herbnexus.org', date: '2026-08-11' },
  { title: 'New road construction', type: 'Habitat Loss', severity: 'HIGH', status: 'VERIFIED', reporter: 'observer@herbnexus.org', date: '2026-08-08' },
  { title: 'Forest fire outskirts', type: 'Fire', severity: 'CRITICAL', status: 'VERIFIED', reporter: 'researcher@herbnexus.org', date: '2026-08-12' },
  { title: 'Illegal quarrying', type: 'Mining', severity: 'MEDIUM', status: 'REJECTED', reporter: 'public@herbnexus.org', date: '2026-08-05' },
];

export default function ThreatManagement() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Threat Management</h1>
        <p className="text-gray-500 mt-2">Review, verify, and resolve environmental threat reports.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reporter</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {threats.map((threat, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{threat.title}</td>
                    <td className="px-6 py-4 text-gray-700">{threat.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        threat.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                        threat.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        defaultValue={threat.status}
                        className="bg-white border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="VERIFIED">VERIFIED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="NEEDS_MORE_INFO">NEEDS MORE INFO</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{threat.reporter}</td>
                    <td className="px-6 py-4 text-gray-500">{threat.date}</td>
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
