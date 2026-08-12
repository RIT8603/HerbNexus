"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, Clock, Search, History, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const verificationData = [
  { name: 'Mon', verified: 12, rejected: 2 },
  { name: 'Tue', verified: 15, rejected: 3 },
  { name: 'Wed', verified: 10, rejected: 1 },
  { name: 'Thu', verified: 22, rejected: 4 },
  { name: 'Fri', verified: 18, rejected: 2 },
  { name: 'Sat', verified: 8, rejected: 1 },
  { name: 'Sun', verified: 14, rejected: 0 },
];

export default function ExpertDashboard() {
  return (
    <ProtectedRoute requiredRole="EXPERT">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Expert Dashboard</h1>
            <p className="text-muted-foreground mt-1">Review and verify botanical observations.</p>
          </div>
          <Link href="/expert/pending" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-4 py-2">
            Start Reviewing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Pending Reviews" 
            value="42" 
            icon={<Clock className="h-5 w-5 text-amber-600" />} 
          />
          <StatCard 
            title="Verified Today" 
            value="15" 
            icon={<CheckCircle className="h-5 w-5 text-emerald-600" />} 
          />
          <StatCard 
            title="Total Reviews" 
            value="1,248" 
            icon={<History className="h-5 w-5 text-blue-600" />} 
          />
          <StatCard 
            title="Species Identified" 
            value="89" 
            icon={<Search className="h-5 w-5 text-purple-600" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">Verified Panax quinquefolius</p>
                      <p className="text-xs text-muted-foreground">Observation #OBS-492{i}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hrs ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
              <CardTitle className="text-primary font-outfit">Verification Throughput</CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={verificationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                  <YAxis tick={{fill: 'var(--muted-foreground)'}} axisLine={{stroke: 'var(--border)'}} />
                  <Tooltip cursor={{fill: 'var(--muted)', opacity: 0.2}} contentStyle={{backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)'}} />
                  <Bar dataKey="verified" fill="var(--chart-1)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="rejected" fill="var(--destructive)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
             <CardHeader>
               <CardTitle>Quick Links</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <Link href="/expert/pending" className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                   <Clock className="mr-2 h-4 w-4"/> View Pending Queue
                </Link>
                <Link href="/expert/history" className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                   <History className="mr-2 h-4 w-4"/> Verification History
                </Link>
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
    </ProtectedRoute>
  );
}
