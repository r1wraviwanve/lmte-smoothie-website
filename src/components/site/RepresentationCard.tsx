"use client";

import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import type { RepresentationItem } from "@/lib/representations-data";

export function RepresentationCard({ item }: { item: RepresentationItem }) {
  const targetUrl = item.url && item.url !== "#" ? item.url : item.image || "#";
  const isClickable = targetUrl !== "#";

  return (
    <a
      href={targetUrl}
      target={isClickable ? "_blank" : undefined}
      rel={isClickable ? "noopener noreferrer" : undefined}
      aria-label={`View Representation ${item.number}: ${item.title}`}
      className="group relative flex flex-col h-full bg-[var(--card-bg)] border border-[var(--border)] rounded-sm overflow-hidden shadow-[0_8px_24px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] hover:border-[var(--accent)] hover:-translate-y-2 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer text-left"
    >
      {/* 1. IMAGE CONTAINER (Primary Visual Focus) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--background)] flex items-center justify-center border-b border-[var(--border-subtle)]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* Archive Folio Placeholder for subsequent representations */
          <div className="w-full h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[var(--background)] via-[var(--card-bg)] to-[var(--background-footer)]">
            <span className="text-xs font-mono font-semibold tracking-widest text-[var(--accent)] uppercase border border-[var(--accent)]/30 px-2 py-0.5 rounded-sm">
              Official Record
            </span>
            <div className="flex flex-col items-center">
              <FileText className="w-10 h-10 text-[var(--accent)]/60 mb-2 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.25} />
              <span className="text-2xl font-heading text-[var(--primary-text)] font-semibold">
                #{item.number}
              </span>
              <span className="text-[11px] font-sans text-[var(--muted-text)] mt-1">
                Public Filing
              </span>
            </div>
            <span className="text-[10px] font-sans text-[var(--secondary-text)] line-clamp-1 uppercase tracking-wider">
              {item.category || "Public Representation"}
            </span>
          </div>
        )}

        {/* Representation Number Badge (Top-left) */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 rounded-sm bg-[var(--background)]/90 backdrop-blur-md border border-[var(--border)] text-[var(--accent)] text-xs font-mono font-bold shadow-md">
            #{item.number}
          </span>
        </div>

        {/* Elegant "View Representation" Hover / Focus Overlay */}
        <div className="absolute inset-0 z-20 bg-[var(--background)]/65 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center p-3 pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-[var(--card-bg)]/95 border border-[var(--accent)] text-[var(--accent)] text-xs font-sans font-medium tracking-wider uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
            View Record
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 2. CARD METADATA & CONTENT */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Date */}
          <div className="flex items-center justify-between gap-2 text-xs font-sans text-[var(--muted-text)] mb-2.5">
            {item.category && (
              <span className="text-[var(--accent)] font-semibold tracking-wider uppercase text-[11px] truncate max-w-[65%]">
                {item.category}
              </span>
            )}
            {item.date && (
              <span className="shrink-0 text-[11px] font-mono">
                {item.date}
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className="text-lg font-heading font-medium leading-snug text-[var(--primary-text)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors duration-300"
            title={item.title}
          >
            {item.title}
          </h4>

          {/* Short Description */}
          {item.description && (
            <p className="text-sm font-sans text-[var(--secondary-text)] line-clamp-3 mt-2 font-light leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Bottom Action Hint */}
        <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-sans text-[var(--muted-text)] group-hover:text-[var(--accent)] transition-colors duration-300">
          <span className="text-xs font-medium tracking-wide">
            Representation #{item.number}
          </span>
          <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            Open ↗
          </span>
        </div>
      </div>
    </a>
  );
}
