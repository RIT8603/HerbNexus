'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const speciesList = [
  { sci: 'Withania somnifera', com: 'Ashwagandha', fam: 'Solanaceae', rare: false },
  { sci: 'Rauvolfia serpentina', com: 'Sarpagandha', fam: 'Apocynaceae', rare: true },
  { sci: 'Bacopa monnieri', com: 'Brahmi', fam: 'Plantaginaceae', rare: false },
  { sci: 'Tinospora cordifolia', com: 'Guduchi', fam: 'Menispermaceae', rare: false },
  { sci: 'Saraca asoca', com: 'Ashoka', fam: 'Fabaceae', rare: true },
  { sci: 'Centella asiatica', com: 'Gotu Kola', fam: 'Apiaceae', rare: false },
  { sci: 'Phyllanthus emblica', com: 'Amla', fam: 'Phyllanthaceae', rare: false },
  { sci: 'Nardostachys jatamansi', com: 'Jatamansi', fam: 'Caprifoliaceae', rare: true },
];

export default function SpeciesManagement() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Species Management</h1>
          <p className="text-gray-500 mt-2">Maintain the master botanical taxonomy database.</p>
        </div>
        <Button className="gap-2"><PlusCircle className="w-4 h-4"/> Add Species</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Family</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {speciesList.map((sp, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold italic text-gray-900">{sp.sci}</td>
                    <td className="px-6 py-4 text-gray-700">{sp.com}</td>
                    <td className="px-6 py-4 text-gray-500">{sp.fam}</td>
                    <td className="px-6 py-4">
                      {sp.rare ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">RARE</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">COMMON</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
