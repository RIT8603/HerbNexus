import { Observation } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";
interface ObservationCardProps {
  observation: Observation;
}

export function ObservationCard({ observation }: ObservationCardProps) {
  const imageUrl = observation.images?.[0]?.image_url || "/placeholder-plant.jpg";
  const speciesName = observation.species?.scientific_name || observation.ai_species_suggestion || "Unknown Species";

  return (
    <Link href={`/observations/${observation.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow group">
        <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
          {/* We'd use next/image in real app with proper domains config, using img for demo safety */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt={speciesName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <StatusBadge status={observation.verification_status} className="shadow-sm bg-white/90 backdrop-blur" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg italic truncate" title={speciesName}>
            {speciesName}
          </h3>
          {observation.species?.common_name && (
            <p className="text-sm text-muted-foreground truncate mb-3">
              {observation.species.common_name}
            </p>
          )}
          
          <div className="space-y-2 mt-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <span>{new Date(observation.observation_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {observation.location_sensitivity === 'HIGH' 
                  ? 'Protected Location' 
                  : `${observation.latitude.toFixed(4)}, ${observation.longitude.toFixed(4)}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
