'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const severityData = [
  { name: 'Critical', value: 12 },
  { name: 'High', value: 34 },
  { name: 'Medium', value: 28 },
  { name: 'Low', value: 15 },
];

const typeData = [
  { name: 'Deforestation', value: 35 },
  { name: 'Illegal Collection', value: 25 },
  { name: 'Habitat Loss', value: 15 },
  { name: 'Mining', value: 14 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
const TYPE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function ThreatAnalysis() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Threat Analysis</h1>
        <p className="text-gray-500 mt-2">Report and monitor active environmental threats.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Reporting Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Report New Threat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Location (Lat, Lng)</Label>
              <div className="flex gap-2 mt-1">
                <input type="text" placeholder="Latitude" className="w-full border rounded-md p-2 text-sm" />
                <input type="text" placeholder="Longitude" className="w-full border rounded-md p-2 text-sm" />
              </div>
            </div>
            
            <div>
              <Label>Threat Type</Label>
              <select className="w-full border rounded-md p-2 text-sm mt-1 bg-white">
                <option>Deforestation</option>
                <option>Illegal Collection</option>
                <option>Habitat Loss</option>
                <option>Fire</option>
                <option>Mining</option>
              </select>
            </div>

            <div>
              <Label>Severity</Label>
              <select className="w-full border rounded-md p-2 text-sm mt-1 bg-white">
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <Label>Description</Label>
              <textarea rows={4} placeholder="Detailed description of the threat..." className="w-full border rounded-md p-2 text-sm mt-1"></textarea>
            </div>

            <div>
              <Label>Photo Upload</Label>
              <input type="file" className="w-full text-sm mt-1" />
            </div>

            <Button className="w-full mt-4">Submit Report</Button>
          </CardContent>
        </Card>

        {/* Right: Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-medium text-gray-500">Total</div>
                <div className="text-2xl font-bold">89</div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-medium text-red-800">Critical</div>
                <div className="text-2xl font-bold text-red-600">12</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-medium text-orange-800">High</div>
                <div className="text-2xl font-bold text-orange-600">34</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-medium text-yellow-800">Medium</div>
                <div className="text-2xl font-bold text-yellow-600">28</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-medium text-green-800">Low</div>
                <div className="text-2xl font-bold text-green-600">15</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={severityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Threat Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={typeData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label>
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Threat Map Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-blue-50 border rounded-md relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://a.tile.openstreetmap.org/6/45/27.png")', backgroundSize: 'cover' }}></div>
                 <span className="relative text-gray-500 font-medium bg-white/80 px-4 py-2 rounded-md shadow-sm">Interactive Map Loaded in Production</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
