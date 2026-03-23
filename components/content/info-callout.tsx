import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

const variants = {
  info: {
    icon: Info,
    style: "bg-blue-50 border-blue-200 text-blue-800",
  },
  warning: {
    icon: AlertTriangle,
    style: "bg-red-50 border-red-200 text-red-800",
  },
  tip: {
    icon: Lightbulb,
    style: "bg-emerald-50 border-emerald-200 text-emerald-800",
  },
};

interface InfoCalloutProps {
  variant?: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}

export function InfoCallout({ variant = "info", title, children }: InfoCalloutProps) {
  const { icon: Icon, style } = variants[variant];

  return (
    <div className={cn("rounded-xl border p-4 flex gap-3", style)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  );
}
