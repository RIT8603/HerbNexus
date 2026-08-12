'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const obsData = [
  { month: 'Jan', count: 120 }, { month: 'Feb', count: 145 },
  { month: 'Mar', count: 180 }, { month: 'Apr', count: 210 },
  { month: 'May', count: 250 }, { month: 'Jun', count: 290 },
  { month: 'Jul', count: 280 }, { month: 'Aug', count: 240 },
  { month: 'Sep', count: 210 }, { month: 'Oct', count: 180 },
  { month: 'Nov', count: 150 }, { month: 'Dec', count: 130 },
];

const verData = [
  { name: 'Verified', value: 72 },
  { name: 'Pending', value: 20 },
  { name: 'Rejected', value: 8 },
];
const COLORS = ['#16a34a', '#eab308', '#ef4444'];

export default function SpeciesAnalytics() {
  const [species, setSpecies] = useState('Withania somnifera');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Species Analytics</h1>
          <p className="text-gray-500 mt-2">Deep dive into individual species metrics.</p>
        </div>
        <select 
          className="p-2 border border-gray-300 rounded-md shadow-sm w-64 bg-white"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        >
          <option>Withania somnifera (Ashwagandha)</option>
          <option>Rauvolfia serpentina (Sarpagandha)</option>
          <option>Bacopa monnieri (Brahmi)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 text-sm">Conservation Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">MODERATE</div>
            <p className="text-sm text-green-600 mt-1">Score: 48/100</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 text-sm">Total Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">3,240</div>
            <p className="text-sm text-blue-600 mt-1">+12% from last year</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-800 text-sm">Related Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">14</div>
            <p className="text-sm text-red-600 mt-1">3 Active, 11 Resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Observation Seasonality</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={obsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={verData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                  {verData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
