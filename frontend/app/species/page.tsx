"use client";

import { useState } from "react";
import { Species } from "@/types";
import { SpeciesCard } from "@/components/SpeciesCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockSpecies: Species[] = [
  {
    id: "1",
    scientific_name: "Panax quinquefolius",
    common_name: "American Ginseng",
    family: "Araliaceae",
    genus: "Panax",
    description: "A herbaceous perennial plant in the ivy family, commonly used in traditional medicine. Known for its distinct fork-like root structure and adaptogenic properties.",
    medicinal_relevance: "High",
    conservation_notes: "Vulnerable due to overharvesting and habitat loss.",
    is_rare: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    scientific_name: "Echinacea purpurea",
    common_name: "Purple Coneflower",
    family: "Asteraceae",
    genus: "Echinacea",
    description: "An Eastern North American species of flowering plant in the sunflower family. Highly recognizable by its vibrant purple petals and spiky central cone.",
    medicinal_relevance: "High",
    conservation_notes: "Secure, but heavily cultivated.",
    is_rare: false,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    scientific_name: "Hydrastis canadensis",
    common_name: "Goldenseal",
    family: "Ranunculaceae",
    genus: "Hydrastis",
    description: "A perennial herb in the buttercup family, characterized by its thick, yellow knotted rootstock. It has a long history of use by Native Americans.",
    medicinal_relevance: "Critical",
    conservation_notes: "Endangered in many wild habitats due to relentless commercial exploitation.",
    is_rare: true,
    created_at: new Date().toISOString()
  }
];

export default function SpeciesExplorer() {
  const [species] = useState<Species[]>(mockSpecies);
  const [loading] = useState(false);
  const [search, setSearch] = useState("");




  const filteredSpecies = species.filter(s => 
    s.scientific_name.toLowerCase().includes(search.toLowerCase()) || 
    s.common_name.toLowerCase().includes(search.toLowerCase()) ||
    s.family.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-16">
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm font-medium">
              <Leaf className="w-4 h-4 mr-2 inline-block" /> Botanical Database
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 dark:text-slate-100 tracking-tight">
              Species Catalogue
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore our comprehensive database of documented plant species. Filter by family, rarity, or medicinal relevance to uncover critical conservation insights.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 mb-8 gap-4 -mt-14 relative z-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by scientific name, common name, or family..." 
              className="pl-10 border-none bg-slate-50 dark:bg-slate-950 focus-visible:ring-1 focus-visible:ring-primary/30 h-12 text-md rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="rounded-xl h-12 border-slate-200 dark:border-slate-800 flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <Button className="rounded-xl h-12 px-8 flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20">
              Search
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {loading ? "Loading species..." : `Showing ${filteredSpecies.length} Species`}
          </h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200/50 dark:border-slate-700/50"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecies.map(s => (
              <SpeciesCard key={s.id} species={s} observationCount={(s.scientific_name.length * 12) + 5} />
            ))}
            {filteredSpecies.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-muted-foreground bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <Leaf className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4 opacity-50" />
                <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">No species found</p>
                <p>We couldn&apos;t find anything matching &quot;{search}&quot;. Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
