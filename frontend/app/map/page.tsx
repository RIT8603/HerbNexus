"use client";

import { useState } from "react";
import { MapView } from "@/components/MapView";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X, ShieldAlert, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicMapPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['VERIFIED', 'PENDING', 'THREATS']);

  // Demo markers for India
  const markers = [
    { id: '1', lat: 28.6139, lng: 77.2090, color: '#10b981', popup: '<div class="font-sans p-1"><b>Panax quinquefolius</b><br/><span style="color:#10b981;font-size:12px;">Verified</span></div>' },
    { id: '2', lat: 19.0760, lng: 72.8777, color: '#f59e0b', popup: '<div class="font-sans p-1"><b>Echinacea purpurea</b><br/><span style="color:#f59e0b;font-size:12px;">Pending Review</span></div>' },
    { id: '3', lat: 12.9716, lng: 77.5946, color: '#10b981', popup: '<div class="font-sans p-1"><b>Azadirachta indica</b><br/><span style="color:#10b981;font-size:12px;">Verified</span></div>' },
    { id: '4', lat: 11.0168, lng: 76.9558, color: '#ef4444', popup: '<div class="font-sans p-1"><b>Habitat Threat</b><br/><span style="color:#ef4444;font-size:12px;">Deforestation reported</span></div>' },
    { id: '5', lat: 25.3176, lng: 82.9739, color: '#10b981', popup: '<div class="font-sans p-1"><b>Ocimum tenuiflorum</b><br/><span style="color:#10b981;font-size:12px;">Verified</span></div>' },
    { id: '6', lat: 22.5726, lng: 88.3639, color: '#f59e0b', popup: '<div class="font-sans p-1"><b>Rauvolfia serpentina</b><br/><span style="color:#f59e0b;font-size:12px;">Pending Review</span></div>' },
  ].filter(m => {
    if (m.color === '#ef4444') return selectedStatus.includes('THREATS');
    if (m.color === '#f59e0b') return selectedStatus.includes('PENDING');
    if (m.color === '#10b981') return selectedStatus.includes('VERIFIED');
    return true;
  });

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Map Area - Full Screen */}
      <div className="absolute inset-0 z-0">
        <MapView 
          center={[78.9629, 20.5937]}
          zoom={4.5}
          markers={markers}
          className="h-full w-full"
        />
      </div>

      {/* Sidebar Overlay */}
      <div className={`absolute top-4 left-4 bottom-4 z-10 w-80 sm:w-96 transition-all duration-300 transform ${showFilters ? 'translate-x-0' : '-translate-x-[110%]'} flex flex-col gap-4`}>
        <Card className="flex-grow flex flex-col overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
          <div className="p-5 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent">
            <h2 className="font-bold text-lg font-outfit flex items-center gap-2 text-primary dark:text-primary-foreground">
              <Layers className="h-5 w-5" /> 
              Map Intelligence
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-5 flex-grow overflow-y-auto space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Data Layers</h3>
              <div className="space-y-3 bg-white/50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleStatus('VERIFIED')}>
                  <Checkbox id="verified" checked={selectedStatus.includes('VERIFIED')} onCheckedChange={() => toggleStatus('VERIFIED')} />
                  <Label htmlFor="verified" className="flex items-center gap-2 cursor-pointer w-full group-hover:text-primary transition-colors">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> 
                    Verified Observations
                  </Label>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleStatus('PENDING')}>
                  <Checkbox id="pending" checked={selectedStatus.includes('PENDING')} onCheckedChange={() => toggleStatus('PENDING')} />
                  <Label htmlFor="pending" className="flex items-center gap-2 cursor-pointer w-full group-hover:text-amber-500 transition-colors">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span> 
                    Pending Review
                  </Label>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleStatus('THREATS')}>
                  <Checkbox id="threats" checked={selectedStatus.includes('THREATS')} onCheckedChange={() => toggleStatus('THREATS')} />
                  <Label htmlFor="threats" className="flex items-center gap-2 cursor-pointer w-full group-hover:text-destructive transition-colors">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span> 
                    Active Threats
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/40 border border-secondary p-4 rounded-xl space-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldAlert className="h-12 w-12 text-primary" />
              </div>
              <h4 className="font-semibold text-sm flex items-center gap-2 text-primary">
                <ShieldAlert className="h-4 w-4" /> Data Protection
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The coordinates of rare and endangered species are artificially obfuscated on this public map to prevent poaching.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Show Filters Button (when hidden) */}
      {!showFilters && (
        <div className="absolute top-4 left-4 z-10">
          <Button variant="default" className="shadow-xl rounded-full px-4 h-10" onClick={() => setShowFilters(true)}>
            <Filter className="h-4 w-4 mr-2" /> Map Intelligence
          </Button>
        </div>
      )}

      {/* Floating Legend for Map */}
      <div className="absolute bottom-6 right-6 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 text-sm">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm inline-block"></span> <span className="font-medium text-xs">Verified</span></div>
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm inline-block"></span> <span className="font-medium text-xs">Pending</span></div>
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-sm inline-block"></span> <span className="font-medium text-xs">Threat</span></div>
        </div>
      </div>
    </div>
  );
}

