'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mocking MapLibre since actual maplibre-gl might cause build issues if missing/unconfigured
const MOCK_OBSERVATIONS = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  lat: 20 + Math.random() * 10,
  lng: 72 + Math.random() * 15,
  status: Math.random() > 0.3 ? 'verified' : 'pending'
}));

const MOCK_THREATS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  lat: 20 + Math.random() * 10,
  lng: 72 + Math.random() * 15,
}));

export default function GISMap() {
  const [layers, setLayers] = useState({ obs: true, threats: true, heatmap: false });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">GIS Intelligence Map</h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Map Layers</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="obs-layer" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Observations
                  </Label>
                  <Switch id="obs-layer" checked={layers.obs} onCheckedChange={(v) => setLayers({...layers, obs: v})} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="threats-layer" className="flex items-center gap-2">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500"></div>
                    Active Threats
                  </Label>
                  <Switch id="threats-layer" checked={layers.threats} onCheckedChange={(v) => setLayers({...layers, threats: v})} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="heatmap-layer">Density Heatmap</Label>
                  <Switch id="heatmap-layer" checked={layers.heatmap} onCheckedChange={(v) => setLayers({...layers, heatmap: v})} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500">Species</Label>
                  <select className="w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm p-2 border">
                    <option>All Species</option>
                    <option>Withania somnifera</option>
                    <option>Rauvolfia serpentina</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Verification Status</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Verified</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Pending</label>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="date" className="border rounded p-1 text-xs" />
                    <input type="date" className="border rounded p-1 text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-blue-50 overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://a.tile.openstreetmap.org/6/45/27.png")', backgroundSize: 'cover' }}></div>
          
          {/* Mock Markers */}
          {layers.obs && MOCK_OBSERVATIONS.map(m => (
            <div 
              key={`obs-${m.id}`} 
              className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform ${m.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'}`}
              style={{ top: `${(m.lat - 20) * 10}%`, left: `${(m.lng - 72) * 6}%` }}
              title={`Observation (Status: ${m.status})`}
            />
          ))}

          {layers.threats && MOCK_THREATS.map(m => (
            <div 
              key={`threat-${m.id}`} 
              className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-red-600 drop-shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
              style={{ top: `${(m.lat - 20) * 10}%`, left: `${(m.lng - 72) * 6}%` }}
              title="Threat Report"
            />
          ))}

          {/* Legend */}
          <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <h4 className="font-bold text-sm mb-2">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Verified Observation</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Pending Observation</div>
              <div className="flex items-center gap-2"><div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-red-600"></div> Active Threat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
