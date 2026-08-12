"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StatusBadge } from "@/components/StatusBadge";
import { MapView } from "@/components/MapView";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Tag, Sprout, TriangleAlert, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ObservationDetail() {
  const params = useParams();
  
  // Mock data for demo
  const obs = {
    id: params.id,
    species_name: "Panax quinquefolius",
    date: "2026-08-10",
    status: "VERIFIED",
    lat: 40.7128,
    lng: -74.0060,
    habitat: "Forest",
    condition: "Healthy",
    ai_confidence: 94,
    notes: "Found near a small stream under dense canopy.",
    is_sensitive: true,
    reviews: [
      { id: 1, expert: "Dr. Sarah Jenkins", date: "2026-08-11", action: "VERIFIED", comment: "Clear identifying features visible. Leaves and stem match P. quinquefolius." }
    ]
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit italic mb-2">{obs.species_name}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {obs.date}</span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1"/> 
                {obs.is_sensitive ? "Protected Location" : `${obs.lat}, ${obs.lng}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={obs.status} />
            <Badge variant="outline" className="text-xs">Demo / Sample Data</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-96 bg-slate-200 rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80" alt="Observation" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white dark:bg-slate-900 border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">AI Identification</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{obs.species_name}</span>
                <span>{obs.ai_confidence}% Confidence</span>
              </div>
              <Progress value={obs.ai_confidence} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground"><Info className="inline h-4 w-4 mr-1"/> AI identification is preliminary and requires expert verification.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">Expert Reviews</h3>
              {obs.reviews.map(rev => (
                <div key={rev.id} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-emerald-700">{rev.expert}</span>
                      <span className="text-xs text-muted-foreground ml-2">{rev.date}</span>
                    </div>
                    <StatusBadge status={rev.action} />
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">&quot;{rev.comment}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-64 border rounded-xl overflow-hidden">
               {obs.is_sensitive ? (
                  <div className="h-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                    <TriangleAlert className="h-8 w-8 mb-2 text-amber-500" />
                    <p className="font-medium text-amber-600 mb-1">Sensitive Location</p>
                    <p className="text-xs">Exact coordinates are hidden to protect this vulnerable species from poaching.</p>
                  </div>
               ) : (
                 <MapView center={[obs.lng, obs.lat]} zoom={14} markers={[{id:'1', lat: obs.lat, lng: obs.lng}]} />
               )}
            </div>

            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold border-b pb-2">Field Data</h3>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs mb-1"><Sprout className="inline h-3 w-3 mr-1"/>Habitat</span>
                    <span className="font-medium">{obs.habitat}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs mb-1"><Tag className="inline h-3 w-3 mr-1"/>Condition</span>
                    <span className="font-medium">{obs.condition}</span>
                  </div>
                </div>
                
                {obs.notes && (
                  <div className="pt-2 border-t mt-2">
                    <span className="text-muted-foreground block text-xs mb-1">Notes</span>
                    <p className="text-sm">{obs.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
