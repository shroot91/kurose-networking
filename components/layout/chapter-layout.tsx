import Link from "next/link";
import { chapters, type Chapter } from "@/data/chapters";
import { SectionNav } from "./section-nav";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChapterLayoutProps {
  chapter: Chapter;
  allChapters?: Chapter[];
  children: React.ReactNode;
}

export function ChapterLayout({ chapter, allChapters, children }: ChapterLayoutProps) {
  const pool = allChapters ?? chapters;
  const prevChapter = pool.find((c) => c.number === chapter.number - 1);
  const nextChapter = pool.find((c) => c.number === chapter.number + 1);

  return (
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-r ${chapter.color} text-white py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-white/70 uppercase tracking-wider mb-2">
            Capítulo {chapter.number}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{chapter.title}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{chapter.description}</p>
        </div>
      </div>

      {/* Content with sidebar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex gap-10">
        <SectionNav sections={chapter.sections} />
        <div className="flex-1 min-w-0 space-y-16">{children}</div>
      </div>

      {/* Chapter navigation */}
      <div className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex justify-between">
          {prevChapter ? (
            <Link
              href={`/${prevChapter.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Cap. {prevChapter.number}: {prevChapter.title}
            </Link>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <Link
              href={`/${nextChapter.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Cap. {nextChapter.number}: {nextChapter.title}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
