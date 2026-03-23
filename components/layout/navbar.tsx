"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, BookOpen, Sun, Moon } from "lucide-react";
import { chapters } from "@/data/chapters";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          <BookOpen className="h-6 w-6 text-accent" />
          Redes Kurose
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${ch.slug}`}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${ch.slug}`
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-card"
              )}
            >
              Cap. {ch.number}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted hover:text-foreground transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            className="p-2 rounded-lg text-muted hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${ch.slug}`}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${ch.slug}`
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              Capítulo {ch.number}: {ch.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
