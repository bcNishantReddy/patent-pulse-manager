
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "dashboard-card animate-fade-in flex items-start gap-4",
        className
      )}
    >
      <div
        className={cn(
          "p-2 rounded-md bg-primary/5"
        )}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <p className="stat-label">{title}</p>
        <p className="stat-value">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
