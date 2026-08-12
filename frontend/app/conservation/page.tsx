'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, Lightbulb, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const threatTrends = [
  { month: 'Jan', deforestation: 4, illegal_collection: 8, habitat_loss: 3 },
  { month: 'Feb', deforestation: 5, illegal_collection: 7, habitat_loss: 4 },
  { month: 'Mar', deforestation: 7, illegal_collection: 10, habitat_loss: 5 },
  { month: 'Apr', deforestation: 8, illegal_collection: 12, habitat_loss: 7 },
  { month: 'May', deforestation: 12, illegal_collection: 15, habitat_loss: 8 },
  { month: 'Jun', deforestation: 15, illegal_collection: 18, habitat_loss: 11 },
];

export default function ConservationDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Conservation Dashboard</h1>
        <p className="text-gray-500 mt-2">Actionable insights for conservation authorities and researchers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Critical Species</p>
              <h3 className="text-2xl font-bold text-red-700">4</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800">High Priority</p>
              <h3 className="text-2xl font-bold text-orange-700">8</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Active Threats</p>
              <h3 className="text-2xl font-bold text-yellow-700">89</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Recommendations</p>
              <h3 className="text-2xl font-bold text-blue-700">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" className="gap-2 text-orange-700 border-orange-200 bg-orange-50 hover:bg-orange-100">
          High Priority Species
        </Button>
        <Button variant="outline" className="gap-2 text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100">
          Sensitive Locations
        </Button>
        <Button variant="outline" className="gap-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
          Conservation Recommendations
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Priority Species</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">View All <ArrowRight className="w-4 h-4"/></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Rauvolfia serpentina', score: 92, badge: 'CRITICAL', color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
                { name: 'Nardostachys jatamansi', score: 88, badge: 'CRITICAL', color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
                { name: 'Saraca asoca', score: 76, badge: 'HIGH', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
                { name: 'Aconitum heterophyllum', score: 72, badge: 'HIGH', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
                { name: 'Commiphora wightii', score: 68, badge: 'HIGH', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
              ].map((sp, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="font-medium italic text-gray-900">{sp.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-[200px]">
                      <div className={`${sp.color} h-2 rounded-full`} style={{ width: `${sp.score}%` }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${sp.bg} ${sp.text}`}>{sp.badge}</span>
                    <span className="text-xs text-gray-500 mt-1">Score: {sp.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Critical Threats</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">View Map <ArrowRight className="w-4 h-4"/></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Illegal Collection', location: 'Western Ghats Region', date: '2 days ago', severity: 'CRITICAL' },
                { type: 'Deforestation', location: 'Himalayan Foothills', date: '3 days ago', severity: 'CRITICAL' },
                { type: 'Mining Activity', location: 'Eastern Ghats', date: '1 week ago', severity: 'HIGH' },
                { type: 'Habitat Loss', location: 'Central India Forests', date: '1 week ago', severity: 'HIGH' },
              ].map((t, i) => (
                <div key={i} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900">{t.type}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3"/> {t.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{t.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${t.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    {t.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
            <CardTitle className="text-primary font-outfit">Conservation Threat Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <YAxis tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                <Area type="monotone" dataKey="deforestation" stackId="1" stroke="var(--destructive)" fill="var(--destructive)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="illegal_collection" stackId="1" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="habitat_loss" stackId="1" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-5 mt-8 text-sm text-orange-800 dark:text-orange-300 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-500" />
        <div>
          <strong className="block mb-1 font-semibold text-orange-900 dark:text-orange-200">Scientific & Population Disclaimer:</strong>
          HerbNexus provides data-driven intelligence to support research and conservation prioritization. <strong>Warning: Observation counts and trends should not be used as absolute population estimates.</strong> AI predictions, observation density, and conservation priority indicators do not replace expert review, systematic field surveys, or official IUCN conservation assessments.
        </div>
      </div>
    </div>
  );
}
