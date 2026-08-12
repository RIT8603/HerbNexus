"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ObservationCard } from "@/components/ObservationCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Observation, Species } from "@/types";

export default function MyObservations() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setObservations([
        {
          id: "obs-1",
          observer_id: "u1",
          species_id: "s1",
          ai_species_suggestion: "Panax quinquefolius",
          species: { id: "s1", scientific_name: "Panax quinquefolius", common_name: "American Ginseng" } as unknown as Species,
          latitude: 40.7128,
          longitude: -74.0060,
          location_sensitivity: "HIGH",
          observation_date: "2026-08-10T10:00:00Z",
          verification_status: "VERIFIED",
          images: [{ id: "i1", observation_id: "obs-1", image_url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80", image_order: 1 }],
          created_at: new Date().toISOString()
        } as Observation,
        {
          id: "obs-2",
          observer_id: "u1",
          species_id: "s2",
          ai_species_suggestion: "Echinacea purpurea",
          latitude: 41.7128,
          longitude: -75.0060,
          location_sensitivity: "LOW",
          observation_date: "2026-08-11T14:30:00Z",
          verification_status: "PENDING",
          images: [{ id: "i2", observation_id: "obs-2", image_url: "https://images.unsplash.com/photo-1505370390161-0d35d2da3fce?w=500&q=80", image_order: 1 }],
          created_at: new Date().toISOString()
        } as Observation
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <ProtectedRoute requiredRole="OBSERVER">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-outfit">My Observations</h1>
            <p className="text-muted-foreground mt-1">Track the status of your submitted records.</p>
          </div>
          <Link href="/observations/new" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-4 py-2">
            <Plus className="mr-2 h-4 w-4" /> New Observation
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
             {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>)}
          </div>
        ) : observations.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            <h3 className="text-lg font-medium mb-2">No observations yet</h3>
            <p className="text-muted-foreground mb-4">You haven&apos;t submitted any plant observations.</p>
            <Link href="/observations/new" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Submit Your First Observation
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Species (AI Suggestion)</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Sensitivity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {observations.map((obs) => (
                    <tr key={obs.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground italic">{obs.ai_species_suggestion}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{obs.id}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(obs.observation_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-muted-foreground">{obs.latitude.toFixed(4)}, {obs.longitude.toFixed(4)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          obs.location_sensitivity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {obs.location_sensitivity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          obs.verification_status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          obs.verification_status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                          'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          {obs.verification_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
