import { ConservationScore } from "@/types";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./StatusBadge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ConservationIndicatorProps {
  score: ConservationScore;
}

export function ConservationIndicator({ score }: ConservationIndicatorProps) {
  // Normalize 0-100 to progress percentage
  const percentage = Math.min(100, Math.max(0, score.total_score));

  const getColorClass = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-amber-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Conservation Priority Index</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                A composite score (0-100) based on HerbNexus data. This indicator supports prioritization and does not replace official conservation assessments.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <StatusBadge status={score.priority_level} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-slate-700 dark:text-slate-300">Total Score</span>
          <span className="font-bold">{score.total_score}/100</span>
        </div>
        {/* We use a div for colored progress since standard Progress doesn't easily support dynamic color classes in this way */}
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getColorClass(score.priority_level)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-muted-foreground mb-1">Trend Score</div>
          <div className="font-semibold">{score.observation_trend_score}/20</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Threat Score</div>
          <div className="font-semibold">{score.habitat_threat_score}/30</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Rarity Score</div>
          <div className="font-semibold">{score.rarity_score}/30</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Data Confidence</div>
          <div className="font-semibold">{score.data_confidence_score}/20</div>
        </div>
      </div>

      {score.recommendation && (
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm border border-slate-100 dark:border-slate-800">
          <span className="font-semibold block mb-1">Recommendation:</span>
          {score.recommendation}
        </div>
      )}
    </div>
  );
}
