"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Species, ConservationScore } from "@/types";
import { ScientificDisclaimer } from "@/components/ScientificDisclaimer";
import { ConservationIndicator } from "@/components/ConservationIndicator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, AlertTriangle, Info, Map as MapIcon, ArrowLeft, Beaker, Sprout, ShieldAlert, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpeciesDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [species, setSpecies] = useState<Species | null>(null);
  const [score, setScore] = useState<ConservationScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setSpecies({
        id: id,
        scientific_name: "Panax quinquefolius",
        common_name: "American Ginseng",
        family: "Araliaceae",
        genus: "Panax",
        description: "American ginseng (Panax quinquefolius) is a herbaceous perennial plant in the ivy family, commonly used as an adaptogen in traditional medicine. It is native to eastern North America. The plant's root is the part primarily used.",
        medicinal_relevance: "High",
        conservation_notes: "Wild populations are highly vulnerable to poaching and habitat destruction. Over-harvesting for the medicinal trade has severely depleted natural stands.",
        is_rare: true,
        created_at: new Date().toISOString()
      });

      setScore({
        id: "s1",
        species_id: id,
        observation_trend_score: 15,
        geographic_concentration_score: 20,
        habitat_threat_score: 25,
        disturbance_score: 10,
        rarity_score: 25,
        data_confidence_score: 18,
        total_score: 85,
        priority_level: "CRITICAL",
        recommendation: "High priority for cultivation research. Wild collection must be strictly prohibited. Habitat monitoring required.",
        calculated_at: new Date().toISOString()
      });
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        <p className="text-muted-foreground animate-pulse font-medium">Loading botanical data...</p>
      </div>
    );
  }

  if (!species) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Species Not Found</h2>
        <Button onClick={() => router.push('/species')}>Return to Explorer</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-16">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60 pt-8 pb-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
          <Leaf className="w-64 h-64 text-primary" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground" onClick={() => router.push('/species')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Database
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {species.family}
                </Badge>
                {species.is_rare && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Rare & Protected
                  </Badge>
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-outfit italic text-slate-900 dark:text-slate-100 mb-2">
                  {species.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium">
                  {species.common_name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-center px-4 border-r border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-primary">1.2k</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Observations</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-bold text-amber-500">CR</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {score && <ConservationIndicator score={score} />}

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
              <Tabs defaultValue="overview" className="w-full">
                <div className="px-6 pt-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <TabsList className="bg-transparent h-auto p-0 flex gap-6">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 data-[state=active]:text-primary font-medium">
                      <Sprout className="h-4 w-4 mr-2" /> Botanical Overview
                    </TabsTrigger>
                    <TabsTrigger value="distribution" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 data-[state=active]:text-primary font-medium">
                      <MapIcon className="h-4 w-4 mr-2" /> Distribution
                    </TabsTrigger>
                    <TabsTrigger value="trends" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 data-[state=active]:text-primary font-medium">
                      <BarChart3 className="h-4 w-4 mr-2" /> Data Trends
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="overview" className="space-y-8 m-0 focus-visible:outline-none">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                         Description
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                        {species.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider font-semibold mb-1">Family</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{species.family}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider font-semibold mb-1">Genus</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{species.genus}</span>
                        </div>
                      </div>
                    </div>

                    {(species.medicinal_relevance || species.conservation_notes) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        {species.medicinal_relevance && (
                          <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 relative overflow-hidden group">
                            <Beaker className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400 flex items-center gap-2 relative z-10">
                              <Leaf className="h-5 w-5" /> Medicinal Demand
                            </h3>
                            <div className="mb-3 relative z-10">
                              <Badge variant="outline" className="bg-white/80 dark:bg-slate-900/80 border-amber-200">
                                Relevance: {species.medicinal_relevance}
                              </Badge>
                            </div>
                            <p className="text-sm text-amber-800/90 dark:text-amber-300/80 relative z-10">
                              When rare species face high medicinal demand, HerbNexus strongly recommends controlled cultivation research rather than wild collection.
                            </p>
                          </div>
                        )}
                        
                        {species.conservation_notes && (
                          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden group">
                            <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/10 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400 flex items-center gap-2 relative z-10">
                              <Info className="h-5 w-5" /> Conservation Notes
                            </h3>
                            <p className="text-sm text-emerald-800/90 dark:text-emerald-300/80 leading-relaxed relative z-10">
                              {species.conservation_notes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="distribution" className="m-0 focus-visible:outline-none">
                    <div className="flex flex-col h-[500px]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <MapIcon className="h-5 w-5 text-primary" /> Geographic Distribution
                        </h3>
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">Verified Obs. Only</Badge>
                      </div>
                      <div className="flex-grow bg-slate-100 dark:bg-slate-950 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                         {/* Placeholder for MapLibre map */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10">
                            <MapIcon className="h-16 w-16 mb-4 opacity-20" />
                            <p className="font-medium">Map layer visualization requires MapLibre GL</p>
                            {species.is_rare && (
                               <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 text-amber-600 px-4 py-2 rounded-lg text-xs max-w-sm text-center border border-amber-100 dark:border-amber-900/50">
                                 Exact coordinates are artificially obfuscated to protect wild populations from poaching.
                               </div>
                            )}
                         </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends" className="m-0 focus-visible:outline-none">
                    <div className="space-y-4">
                       <h3 className="font-semibold text-lg">Observation Trends (Last 12 Months)</h3>
                       <div className="h-72 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-200/50 dark:border-slate-800/50">
                          {/* Placeholder for Recharts line chart */}
                          <div className="text-center">
                            <BarChart3 className="h-12 w-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
                            <p className="text-muted-foreground text-sm font-medium">Chart visualization requires Recharts integration</p>
                          </div>
                       </div>
                       <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-xs text-muted-foreground mt-4">
                          <strong>Note:</strong> Observation frequency may be affected by survey effort, accessibility, seasonality, and other external factors.
                       </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <ScientificDisclaimer />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                Database Statistics
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 font-medium">Verified Observations</span>
                  <span className="font-bold text-lg text-slate-900 dark:text-slate-100">1,245</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 font-medium">Pending Review</span>
                  <span className="font-bold text-lg text-amber-500">42</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 font-medium">Active Threat Reports</span>
                  <span className="font-bold text-lg text-destructive">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">First Recorded</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Nov 14, 2023</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full rounded-xl py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                  Report Sighting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
