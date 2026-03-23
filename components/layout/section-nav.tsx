"use client";

import { useSectionObserver } from "@/hooks/use-section-observer";
import { cn } from "@/lib/utils";

interface SectionNavProps {
  sections: { id: string; title: string }[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const activeId = useSectionObserver(sections.map((s) => s.id));

  return (
    <nav className="hidden lg:block sticky top-24 w-56 shrink-0 self-start">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
        Contenido
      </p>
      <ul className="space-y-1 border-l-2 border-border">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block pl-4 py-1.5 text-sm transition-colors border-l-2 -ml-[2px]",
                activeId === section.id
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-muted hover:text-foreground hover:border-border"
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
