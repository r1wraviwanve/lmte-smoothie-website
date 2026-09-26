"use client";

import { HeaderSocialIcons } from "@/components/site/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export function HeaderActions() {
  return (
    <div className="fixed top-5 right-4 sm:right-6 md:right-10 z-50 flex items-center gap-2 sm:gap-2.5 bg-[var(--background-secondary)]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--border)] shadow-[0_4px_25px_var(--shadow-color)]">
      <HeaderSocialIcons />
      <div className="w-[1px] h-6 bg-[var(--border)] mx-0.5 sm:mx-1 opacity-70" />
      <ThemeToggle className="!static !top-auto !right-auto shadow-none" />
    </div>
  );
}
