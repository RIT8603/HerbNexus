'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const auditLogs = [
  { time: '2026-08-12 12:45:00', user: 'expert@herbnexus.org', action: 'EXPERT_REVIEW', entity: 'OBSERVATION', id: 'a1b2c3d4', details: 'Status changed to VERIFIED' },
  { time: '2026-08-12 11:30:15', user: 'admin@herbnexus.org', action: 'USER_ROLE_UPDATE', entity: 'USER', id: 'e5f6g7h8', details: 'Role changed to EXPERT' },
  { time: '2026-08-12 10:15:22', user: 'admin@herbnexus.org', action: 'SPECIES_CREATED', entity: 'SPECIES', id: 'i9j0k1l2', details: 'Added Withania somnifera' },
  { time: '2026-08-12 09:05:40', user: 'conservation@herbnexus.org', action: 'THREAT_STATUS_UPDATE', entity: 'THREAT', id: 'm3n4o5p6', details: 'Status changed to VERIFIED' },
  { time: '2026-08-11 16:20:10', user: 'SYSTEM', action: 'CONSERVATION_SCORE_CALC', entity: 'SPECIES', id: 'q7r8s9t0', details: 'Recalculated scores for 8 species' },
  { time: '2026-08-11 14:10:05', user: 'researcher@herbnexus.org', action: 'BULK_DATA_EXPORT', entity: 'OBSERVATION', id: 'ALL', details: 'Exported 2026 Q1 dataset' },
  { time: '2026-08-10 08:00:00', user: 'SYSTEM', action: 'SYSTEM_BACKUP', entity: 'DATABASE', id: 'DB-MAIN', details: 'Automated backup completed' },
];

export default function AuditLogs() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 mt-2">Comprehensive, immutable record of critical system actions.</p>
      </div>

      <Card className="bg-gray-50 mb-6">
        <CardContent className="p-4 flex gap-4 items-end">
          <div className="flex-1">
            <Label>Date Range</Label>
            <div className="flex gap-2 mt-1">
              <input type="date" className="border p-2 rounded-md text-sm w-full" />
              <input type="date" className="border p-2 rounded-md text-sm w-full" />
            </div>
          </div>
          <div className="flex-1">
            <Label>Action Type</Label>
            <select className="border p-2 rounded-md text-sm w-full mt-1 bg-white">
              <option>ALL ACTIONS</option>
              <option>EXPERT_REVIEW</option>
              <option>USER_ROLE_UPDATE</option>
              <option>SPECIES_CREATED</option>
            </select>
          </div>
          <Button>Filter</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Entity Type</th>
                  <th className="px-6 py-4">Entity ID</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{log.time}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{log.entity}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{log.id}</td>
                    <td className="px-6 py-4 text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500">
            <span>Showing 1 to 7 of 124 entries</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
