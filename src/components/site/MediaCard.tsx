"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { MediaItem } from "@/lib/media-data";

export function MediaCard({ item }: { item: MediaItem }) {
  const initialThumb = item.videoId
    ? `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`
    : null;
  const fallbackThumb = item.videoId
    ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
    : null;

  const [imgSrc, setImgSrc] = useState<string | null>(initialThumb);

  const handleImageError = () => {
    if (fallbackThumb && imgSrc !== fallbackThumb) {
      setImgSrc(fallbackThumb);
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch "${item.title}" on ${item.platform}`}
      className="group flex flex-col h-full bg-[var(--card-bg)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--accent)] hover:-translate-y-2 shadow-[0_8px_30px_var(--shadow-color)] hover:shadow-[0_22px_45px_var(--shadow-color)] transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--background)] flex items-center justify-center">
        {item.type === "youtube" && imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={item.title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* Facebook Branded Media Card Poster */
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[var(--background)] via-[var(--card-bg)] to-[var(--background-footer)] flex flex-col justify-between p-4 transition-transform duration-700 ease-out group-hover:scale-105">
            {/* Subtle glow accents */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#1877F2]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Platform Tag */}
            <div className="flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1877F2]/15 border border-[#1877F2]/30 text-[var(--primary-text)] text-[11px] font-sans font-medium tracking-wide">
                <svg className="w-3 h-3 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook Video
              </span>
            </div>

            {/* Center label */}
            <div className="relative z-10 text-center px-2">
              <p className="text-[10px] font-sans tracking-widest text-[var(--accent)] uppercase font-semibold">
                Social Initiative
              </p>
              <p className="text-[var(--secondary-text)] font-sans text-xs line-clamp-1 mt-0.5 font-medium">
                Maharashtra Curriculum Reform
              </p>
            </div>

            <div />
          </div>
        )}

        {/* Centered Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-[var(--background)]/85 backdrop-blur-md border border-[var(--border)] flex items-center justify-center text-[var(--primary-text)] shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-[var(--background)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]">
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Platform tag overlay on YouTube */}
        {item.type === "youtube" && (
          <div className="absolute top-2.5 right-2.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--background)]/85 backdrop-blur-sm border border-[var(--border)] text-[var(--primary-text)] text-[10px] font-sans tracking-wide">
              <svg className="w-2.5 h-2.5 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {item.platform}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[var(--accent)] block mb-2">
            {item.category}
          </span>

          {/* Marathi Title with line clamp */}
          <h3
            className="text-base font-heading font-medium leading-snug text-[var(--primary-text)] line-clamp-3 group-hover:text-[var(--accent)] transition-colors duration-300"
            title={item.title}
          >
            {item.title}
          </h3>
        </div>

        {/* Platform label and View/Watch action */}
        <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-sans font-medium text-[var(--secondary-text)] group-hover:text-[var(--accent)] transition-colors duration-300">
          <span>{item.type === "youtube" ? "Watch on YouTube" : "Watch on Facebook"}</span>
          <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
