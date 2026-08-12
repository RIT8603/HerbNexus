'use client';

import React from 'react';
import { 
  BarChart3, CheckCircle, Clock, Leaf, AlertTriangle, Shield,
  Map as MapIcon, LineChart as LineChartIcon, Activity, AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--primary)', 'var(--secondary)', 'var(--accent)'];
const STATUS_COLORS = ['var(--chart-1)', 'var(--chart-3)', 'var(--destructive)', 'var(--chart-5)'];
const THREAT_COLORS = 'var(--destructive)';

const areaData = [
  { name: 'Jan 23', count: 210 }, { name: 'Apr 23', count: 280 },
  { name: 'Jul 23', count: 320 }, { name: 'Oct 23', count: 310 },
  { name: 'Jan 24', count: 350 }, { name: 'Apr 24', count: 420 },
  { name: 'Jul 24', count: 460 }, { name: 'Oct 24', count: 430 },
  { name: 'Jan 25', count: 480 }, { name: 'Apr 25', count: 510 },
  { name: 'Jul 25', count: 490 }, { name: 'Oct 25', count: 520 },
  { name: 'Jan 26', count: 550 }, { name: 'Apr 26', count: 590 },
];

const speciesData = [
  { name: 'Withania somnifera', value: 3240 },
  { name: 'Bacopa monnieri', value: 2840 },
  { name: 'Centella asiatica', value: 2140 },
  { name: 'Tinospora cordifolia', value: 1850 },
  { name: 'Phyllanthus emblica', value: 1420 },
  { name: 'Rauvolfia serpentina', value: 890 },
  { name: 'Saraca asoca', value: 650 },
  { name: 'Nardostachys jatamansi', value: 310 },
];

const threatData = [
  { name: 'Deforestation', value: 23 },
  { name: 'Illegal Collection', value: 18 },
  { name: 'Habitat Loss', value: 15 },
  { name: 'Fire', value: 12 },
  { name: 'Mining', value: 8 },
  { name: 'Grazing', value: 6 },
  { name: 'Pollution', value: 4 },
  { name: 'Invasive Species', value: 3 },
];

const statusData = [
  { name: 'Verified', value: 65 },
  { name: 'Pending', value: 22 },
  { name: 'Rejected', value: 8 },
  { name: 'Needs More Info', value: 5 },
];

export default function ResearchDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Research Dashboard</h1>
        <p className="text-gray-500 mt-2">Comprehensive botanical intelligence, trends, and verification metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { title: 'Total Obs', value: '12,847', icon: BarChart3, color: 'text-blue-600' },
          { title: 'Verified', value: '8,234', icon: CheckCircle, color: 'text-green-600' },
          { title: 'Pending', value: '2,891', icon: Clock, color: 'text-yellow-600' },
          { title: 'Species', value: '847', icon: Leaf, color: 'text-emerald-600' },
          { title: 'Active Threats', value: '89', icon: AlertTriangle, color: 'text-red-600' },
          { title: 'High Priority', value: '23', icon: Shield, color: 'text-purple-600' }
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" className="gap-2"><MapIcon className="w-4 h-4"/> GIS Intelligence Map</Button>
        <Button variant="outline" className="gap-2"><Activity className="w-4 h-4"/> Species Analytics</Button>
        <Button variant="outline" className="gap-2"><LineChartIcon className="w-4 h-4"/> Historical Trends</Button>
        <Button variant="outline" className="gap-2"><AlertCircle className="w-4 h-4"/> Threat Analysis</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Observations Over Time</CardTitle>
            <CardDescription>Monthly records from Jan 2023 to Jun 2026</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <YAxis tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                <Area type="monotone" dataKey="count" stroke="var(--chart-1)" strokeWidth={2} fill="var(--chart-1)" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Species Distribution</CardTitle>
            <CardDescription>Top 8 recorded species by volume</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={speciesData} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threat Categories</CardTitle>
            <CardDescription>Active reports by threat type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <YAxis dataKey="name" type="category" width={110} fontSize={12} tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                <Tooltip cursor={{fill: 'var(--muted)', opacity: 0.2}} contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                <Bar dataKey="value" fill={THREAT_COLORS} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Current state of all observations</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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
