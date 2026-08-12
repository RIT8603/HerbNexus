import { Species } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Leaf, AlertTriangle, ChevronRight } from "lucide-react";

interface SpeciesCardProps {
  species: Species;
  observationCount?: number;
}

export function SpeciesCard({ species, observationCount }: SpeciesCardProps) {
  return (
    <Link href={`/species/${species.id}`} className="block h-full group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200/60 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col group-hover:-translate-y-1">
        <div className="h-2 w-full bg-gradient-to-r from-primary/40 to-primary/10"></div>
        <CardHeader className="pb-3 pt-5">
          <div className="flex justify-between items-start gap-2">
            <div>
              <Badge variant="outline" className="mb-3 text-[10px] uppercase tracking-wider font-semibold text-primary/70 border-primary/20 bg-primary/5">
                {species.family}
              </Badge>
              <CardTitle className="italic text-xl font-outfit text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                {species.scientific_name}
              </CardTitle>
              <CardDescription className="text-sm font-medium mt-1">
                {species.common_name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
            {species.description}
          </p>
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center gap-2 flex-wrap">
              {species.medicinal_relevance && species.medicinal_relevance !== 'None' && (
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 flex items-center gap-1 text-xs">
                  <Leaf className="h-3 w-3" /> {species.medicinal_relevance} Demand
                </Badge>
              )}
              {species.is_rare && (
                <Badge variant="destructive" className="flex items-center gap-1 text-xs bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                  <AlertTriangle className="h-3 w-3" /> Rare
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {observationCount !== undefined && (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="text-primary">{observationCount}</span> Verified Obs
                </span>
              )}
              <span className="text-xs font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                View Details <ChevronRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
