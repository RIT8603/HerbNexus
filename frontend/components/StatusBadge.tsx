import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 'VERIFIED' | 'PENDING' | 'REJECTED' | 'NEEDS_MORE_INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export function StatusBadge({ status, className }: { status: StatusType | string, className?: string }) {
  const getVariants = (s: string) => {
    switch (s) {
      case 'VERIFIED':
      case 'LOW':
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300";
      case 'PENDING':
      case 'MEDIUM':
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300";
      case 'REJECTED':
      case 'CRITICAL':
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300";
      case 'NEEDS_MORE_INFO':
      case 'HIGH':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getLabel = (s: string) => s.replace(/_/g, ' ');

  return (
    <Badge variant="outline" className={cn("font-medium border-transparent", getVariants(status), className)}>
      {getLabel(status)}
    </Badge>
  );
}
