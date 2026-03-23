import { BookOpen } from "lucide-react";

interface ExampleBlockProps {
  title: string;
  children: React.ReactNode;
}

export function ExampleBlock({ title, children }: ExampleBlockProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm uppercase tracking-wide">
          Ejemplo: {title}
        </h4>
      </div>
      <div className="text-sm leading-relaxed text-amber-900 dark:text-amber-200 space-y-3">{children}</div>
    </div>
  );
}
