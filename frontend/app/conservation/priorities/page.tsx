'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const demoSpecies = [
  { name: 'Rauvolfia serpentina', common: 'Sarpagandha', family: 'Apocynaceae', score: 92, badge: 'CRITICAL' },
  { name: 'Nardostachys jatamansi', common: 'Jatamansi', family: 'Caprifoliaceae', score: 88, badge: 'CRITICAL' },
  { name: 'Saraca asoca', common: 'Ashoka', family: 'Fabaceae', score: 76, badge: 'HIGH' },
  { name: 'Aconitum heterophyllum', common: 'Atis', family: 'Ranunculaceae', score: 72, badge: 'HIGH' },
  { name: 'Commiphora wightii', common: 'Guggul', family: 'Burseraceae', score: 68, badge: 'HIGH' },
  { name: 'Aquilaria malaccensis', common: 'Agarwood', family: 'Thymelaeaceae', score: 65, badge: 'HIGH' },
  { name: 'Withania somnifera', common: 'Ashwagandha', family: 'Solanaceae', score: 48, badge: 'MODERATE' },
  { name: 'Bacopa monnieri', common: 'Brahmi', family: 'Plantaginaceae', score: 42, badge: 'MODERATE' },
];

function getColor(score: number) {
  if (score > 80) return { bg: 'bg-red-500', badgeBg: 'bg-red-100', badgeText: 'text-red-700' };
  if (score > 60) return { bg: 'bg-orange-500', badgeBg: 'bg-orange-100', badgeText: 'text-orange-700' };
  if (score > 40) return { bg: 'bg-yellow-500', badgeBg: 'bg-yellow-100', badgeText: 'text-yellow-700' };
  return { bg: 'bg-green-500', badgeBg: 'bg-green-100', badgeText: 'text-green-700' };
}

export default function HighPrioritySpecies() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">High Priority Species</h1>
        <p className="text-gray-500 mt-2">Species ranked by conservation priority score based on rarity, threat levels, and demand.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-600 italic">
        <strong>Disclaimer:</strong> This indicator supports prioritization and does not replace official conservation assessments.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoSpecies.map((sp, i) => {
          const colors = getColor(sp.score);
          return (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${colors.badgeBg} ${colors.badgeText}`}>
                      {sp.badge}
                    </span>
                    <span className="text-sm font-bold text-gray-500">{sp.score}/100</span>
                  </div>
                  
                  <h3 className="text-lg font-bold italic mt-2">{sp.name}</h3>
                  <p className="text-sm font-medium text-gray-600">{sp.common}</p>
                  <p className="text-xs text-gray-400 mt-1">{sp.family}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                    <div className={`${colors.bg} h-1.5 rounded-full`} style={{ width: `${sp.score}%` }}></div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4 line-clamp-2">
                    Recommendation: High medicinal demand coupled with habitat loss requires immediate field survey prioritization.
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
