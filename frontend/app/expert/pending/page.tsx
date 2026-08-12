"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function PendingVerification() {
  const pending = [
    { id: '101', species: 'Panax quinquefolius', conf: 85, date: '2026-08-11', loc: 'Appalachian Region', observer: 'J. Doe' },
    { id: '102', species: 'Hydrastis canadensis', conf: 62, date: '2026-08-10', loc: 'Midwest Region', observer: 'A. Smith' },
    { id: '103', species: 'Echinacea pallida', conf: 91, date: '2026-08-09', loc: 'Plains Region', observer: 'R. Roe' },
  ];

  return (
    <ProtectedRoute requiredRole="EXPERT">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-outfit flex items-center gap-2">
            <Clock className="h-8 w-8 text-amber-600" /> Pending Verification
          </h1>
          <p className="text-muted-foreground mt-1">Review AI predictions and confirm species identity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pending.map(obs => (
            <Link key={obs.id} href={`/expert/review/${obs.id}`}>
              <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-amber-500 overflow-hidden group">
                <div className="h-40 bg-slate-200 overflow-hidden relative">
                   <img src={`https://source.unsplash.com/random/400x300/?plant,leaf&sig=${obs.id}`} alt="Plant" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                   {obs.conf < 70 && (
                      <Badge variant="destructive" className="absolute top-2 right-2">Low Conf</Badge>
                   )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold italic text-lg mb-1">{obs.species}</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">AI Confidence</span>
                      <span className="font-medium">{obs.conf}%</span>
                    </div>
                    <Progress value={obs.conf} className="h-1.5" />
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {obs.loc}</span>
                      <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {obs.date}</span>
                    </div>
                    <div>Observer: {obs.observer}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
