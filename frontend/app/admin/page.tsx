'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, FileText, Leaf, ShieldAlert, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const roleData = [
  { name: 'Public', count: 1240 },
  { name: 'Observer', count: 850 },
  { name: 'Expert', count: 45 },
  { name: 'Researcher', count: 120 },
  { name: 'Conservation', count: 35 },
  { name: 'Admin', count: 8 },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-6 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">System overview and platform management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Users', value: '2,298', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Observations', value: '12,847', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Species', value: '847', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Threats', value: '89', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className={`p-3 rounded-full mb-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
            <CardTitle className="text-primary font-outfit">Users by Role</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <YAxis tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <Tooltip cursor={{fill: 'var(--muted)', opacity: 0.2}} contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
            <CardTitle className="text-primary font-outfit">Recent Audit Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-slate-50 dark:bg-slate-900 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Action</th>
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { action: 'EXPERT_REVIEW', user: 'expert@herbnexus.org', time: '10 mins ago' },
                    { action: 'USER_ROLE_UPDATE', user: 'admin@herbnexus.org', time: '1 hour ago' },
                    { action: 'SPECIES_CREATED', user: 'admin@herbnexus.org', time: '2 hours ago' },
                    { action: 'THREAT_STATUS_UPDATE', user: 'conservation@herbnexus.org', time: '3 hours ago' },
                    { action: 'SYSTEM_BACKUP', user: 'SYSTEM', time: '5 hours ago' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{log.action}</td>
                      <td className="px-4 py-3 text-muted-foreground">{log.user}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border text-center bg-slate-50/50 dark:bg-slate-900/50">
              <a href="/admin/audit" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">View Full Log &rarr;</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
