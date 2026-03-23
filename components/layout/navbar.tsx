"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { chapters } from "@/data/chapters";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          <Globe className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline">Redes Kurose</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${ch.slug}`}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${ch.slug}`
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-slate-100 hover:text-foreground"
              )}
            >
              Cap. {ch.number}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/${ch.slug}`}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === `/${ch.slug}`
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-slate-100"
              )}
            >
              Capítulo {ch.number}: {ch.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
