'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trendData = [
  { year: '2022', W_somnifera: 320, R_serpentina: 110, B_monnieri: 250, T_cordifolia: 190, S_asoca: 80 },
  { year: '2023', W_somnifera: 450, R_serpentina: 105, B_monnieri: 310, T_cordifolia: 240, S_asoca: 75 },
  { year: '2024', W_somnifera: 580, R_serpentina: 95,  B_monnieri: 390, T_cordifolia: 280, S_asoca: 60 },
  { year: '2025', W_somnifera: 720, R_serpentina: 85,  B_monnieri: 480, T_cordifolia: 310, S_asoca: 55 },
  { year: '2026', W_somnifera: 890, R_serpentina: 70,  B_monnieri: 590, T_cordifolia: 360, S_asoca: 45 },
];

export default function HistoricalTrends() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Historical Trends</h1>
        <p className="text-gray-500 mt-2">Analyze long-term observation patterns and species prevalence.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Observation Frequency (2022-2026)</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="W_somnifera" name="Withania somnifera" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="R_serpentina" name="Rauvolfia serpentina" stroke="#dc2626" strokeWidth={2} />
              <Line type="monotone" dataKey="B_monnieri" name="Bacopa monnieri" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="T_cordifolia" name="Tinospora cordifolia" stroke="#9333ea" strokeWidth={2} />
              <Line type="monotone" dataKey="S_asoca" name="Saraca asoca" stroke="#ea580c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800 italic">
        <strong>Data Interpretation Note:</strong> Observation frequency may be affected by survey effort, accessibility, seasonality, and other factors. A decrease in observed records indicates lower sighting rates, rather than definitively confirming that the overall population has decreased.
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Species</th>
                  <th className="px-6 py-3">2022</th>
                  <th className="px-6 py-3">2026</th>
                  <th className="px-6 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium italic">Withania somnifera</td>
                  <td className="px-6 py-4">320</td>
                  <td className="px-6 py-4">890</td>
                  <td className="px-6 py-4 text-green-600 font-bold">+178%</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium italic">Rauvolfia serpentina</td>
                  <td className="px-6 py-4">110</td>
                  <td className="px-6 py-4">70</td>
                  <td className="px-6 py-4 text-red-600 font-bold">-36%</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium italic">Bacopa monnieri</td>
                  <td className="px-6 py-4">250</td>
                  <td className="px-6 py-4">590</td>
                  <td className="px-6 py-4 text-green-600 font-bold">+136%</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium italic">Saraca asoca</td>
                  <td className="px-6 py-4">80</td>
                  <td className="px-6 py-4">45</td>
                  <td className="px-6 py-4 text-red-600 font-bold">-43%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
