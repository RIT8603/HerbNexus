import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-muted-foreground bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{value}</div>
          {(description || trend) && (
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {trend && (
                <span className={cn("font-medium", trend.isPositive ? "text-emerald-600" : "text-red-600")}>
                  {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                </span>
              )}
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
