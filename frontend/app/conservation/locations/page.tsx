'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

const sensitiveData = [
  { region: 'Himalayan Alpine', species: 'Nardostachys jatamansi', level: 'HIGHLY_SENSITIVE', access: 'Admin, Expert, Conservation' },
  { region: 'Western Ghats Core', species: 'Rauvolfia serpentina', level: 'HIGHLY_SENSITIVE', access: 'Admin, Expert, Conservation' },
  { region: 'Eastern Ghats', species: 'Cycas beddomei', level: 'SENSITIVE', access: 'Admin, Expert, Researcher, Conservation' },
  { region: 'Central India', species: 'Boswellia serrata', level: 'SENSITIVE', access: 'Admin, Expert, Researcher, Conservation' },
];

export default function SensitiveLocations() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sensitive Locations</h1>
        <p className="text-gray-500 mt-2">Protected coordinates for endangered and high-risk botanical assets.</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-800 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p><strong>Strict Privacy Enforced:</strong> Exact coordinates of sensitive species are protected and only available to authorized personnel. Public and standard observer roles receive intentionally jittered (blurred) coordinates via the API.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Protected Geographic Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px] bg-blue-50 border rounded-md relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url("https://a.tile.openstreetmap.org/6/45/27.png")', backgroundSize: 'cover' }}></div>
                 
                 {/* Mock Shields */}
                 <ShieldAlert className="absolute text-red-600 drop-shadow-md w-8 h-8" style={{ top: '30%', left: '40%' }} />
                 <ShieldAlert className="absolute text-red-600 drop-shadow-md w-8 h-8" style={{ top: '70%', left: '30%' }} />
                 <ShieldAlert className="absolute text-orange-500 drop-shadow-md w-6 h-6" style={{ top: '60%', left: '60%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Control Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sensitiveData.map((item, i) => (
                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900">{item.region}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.level === 'HIGHLY_SENSITIVE' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.level.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm italic text-gray-700 mb-2">{item.species}</p>
                  <div className="bg-gray-50 rounded p-2 text-xs text-gray-600">
                    <strong>Allowed Roles:</strong><br/>{item.access}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
