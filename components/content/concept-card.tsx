import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface ConceptCardProps {
  title: string;
  icon: LucideIcon;
  color?: string;
  children: React.ReactNode;
}

export function ConceptCard({
  title,
  icon: Icon,
  color = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
  children,
}: ConceptCardProps) {
  return (
    <div className={cn("rounded-xl border p-5", color)}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 shrink-0" />
        <h3 className="font-semibold text-base">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
