'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, ShieldCheck, LeafyGreen } from 'lucide-react';

const recommendations = [
  { 
    name: 'Rauvolfia serpentina', 
    rarity: 'RARE', 
    demand: 'VERY HIGH', 
    score: 92,
    text: "Consider controlled propagation or authorized cultivation research to reduce pressure on wild populations."
  },
  { 
    name: 'Nardostachys jatamansi', 
    rarity: 'RARE', 
    demand: 'VERY HIGH', 
    score: 88,
    text: "Consider controlled propagation or authorized cultivation research to reduce pressure on wild populations."
  },
  { 
    name: 'Saraca asoca', 
    rarity: 'RARE', 
    demand: 'HIGH', 
    score: 76,
    text: "Consider controlled propagation or authorized cultivation research to reduce pressure on wild populations."
  }
];

export default function ConservationRecommendations() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Conservation Recommendations</h1>
        <p className="text-gray-500 mt-2">Automated strategies for rare species experiencing high medicinal or commercial demand.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
        <strong>Important Disclaimer:</strong> This is a research/conservation recommendation only. It does not imply that cultivation is authorized or safe without proper regulatory review. We do NOT provide medical advice or encourage unauthorized wild collection.
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <CardTitle className="italic text-xl">{rec.name}</CardTitle>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">{rec.rarity}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">DEMAND: {rec.demand}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-500">Priority Score</span>
                <div className="text-xl font-bold text-gray-900">{rec.score}</div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-blue-50 text-blue-900 p-4 rounded-md font-medium text-lg mb-6">
                {rec.text}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 border rounded-md border-green-200 bg-white">
                  <LeafyGreen className="w-8 h-8 text-green-600 mb-2" />
                  <span className="font-semibold">Controlled Cultivation</span>
                  <div className="flex items-center text-green-600 mt-2 font-bold">
                    <ArrowUpRight className="w-4 h-4 mr-1" /> Increase
                  </div>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-md border-red-200 bg-white">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  </div>
                  <span className="font-semibold">Wild Collection</span>
                  <div className="flex items-center text-red-600 mt-2 font-bold">
                    <ArrowDownRight className="w-4 h-4 mr-1" /> Decrease
                  </div>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-md border-blue-200 bg-white">
                  <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="font-semibold">Wild Population Protection</span>
                  <div className="flex items-center text-blue-600 mt-2 font-bold">
                    <ArrowUpRight className="w-4 h-4 mr-1" /> Increase
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
