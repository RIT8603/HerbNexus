"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapView } from "@/components/MapView";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useParams, useRouter } from "next/navigation";
import { Check, X, HelpCircle, MapPin, Calendar, Info } from "lucide-react";
import { useState } from "react";

export default function ReviewObservation() {
  const params = useParams();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const obs = {
    id: params.id,
    species: "Panax quinquefolius",
    conf: 85,
    lat: 38.5,
    lng: -79.2,
    date: "2026-08-11",
    habitat: "Deciduous Forest",
    notes: "Found near northeast facing slope.",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"
  };

  const handleAction = (action: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
       setIsSubmitting(false);
       router.push('/expert/pending');
    }, 1000);
  };

  return (
    <ProtectedRoute requiredRole="EXPERT">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold font-outfit mb-6">Review Observation #{obs.id}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-200 rounded-xl overflow-hidden h-[500px] border">
               <img src={obs.image} className="w-full h-full object-cover" alt="Plant observation" />
            </div>
            
            <div className="bg-white dark:bg-slate-900 border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Add Verification Notes</h3>
              <Textarea 
                placeholder="Required for rejections, optional for verifications..." 
                className="mb-4"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex gap-3">
                <Button onClick={() => handleAction('VERIFY')} disabled={isSubmitting} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Check className="mr-2 h-4 w-4" /> Verify AI ID
                </Button>
                <Button onClick={() => handleAction('REJECT')} disabled={isSubmitting} variant="destructive" className="flex-1">
                  <X className="mr-2 h-4 w-4" /> Reject ID
                </Button>
                <Button onClick={() => handleAction('INFO')} disabled={isSubmitting} variant="outline" className="flex-1">
                  <HelpCircle className="mr-2 h-4 w-4" /> Need Info
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">AI Suggestion</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold italic text-emerald-700 dark:text-emerald-400 text-xl">{obs.species}</span>
                <Badge variant={obs.conf > 80 ? "default" : "secondary"}>{obs.conf}% Match</Badge>
              </div>
              <Progress value={obs.conf} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground"><Info className="inline h-4 w-4 mr-1"/> Check leaf structure and serration pattern to confirm.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">Field Metadata</h3>
              <div className="space-y-3 text-sm">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center"><Calendar className="h-4 w-4 mr-2"/> Date</span>
                    <span className="font-medium">{obs.date}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center"><MapPin className="h-4 w-4 mr-2"/> Habitat</span>
                    <span className="font-medium">{obs.habitat}</span>
                 </div>
                 <div className="pt-3 border-t">
                    <span className="text-muted-foreground block mb-1">Observer Notes:</span>
                    <p className="italic bg-slate-50 dark:bg-slate-800 p-2 rounded">{obs.notes}</p>
                 </div>
              </div>
            </div>
            
            <div className="h-64 border rounded-xl overflow-hidden relative">
               <MapView center={[obs.lng, obs.lat]} zoom={12} markers={[{id:'1', lat: obs.lat, lng: obs.lng}]} />
               <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded shadow-sm border border-amber-200">
                 Location obscured for public
               </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
