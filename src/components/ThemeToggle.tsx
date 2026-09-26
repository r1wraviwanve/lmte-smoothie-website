"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div
        className={`fixed top-6 right-6 md:right-10 z-50 w-11 h-11 rounded-full bg-[var(--background-secondary)]/90 border border-[var(--border)] opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Dark Theme is the default theme
  const isDark = resolvedTheme !== "light";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to Light / Warm Ivory theme" : "Switch to Dark theme"}
      className={`fixed top-6 right-6 md:right-10 z-50 w-11 h-11 rounded-full bg-[var(--background-secondary)]/90 backdrop-blur-md border border-[var(--border)] shadow-[0_4px_20px_var(--shadow-color)] hover:border-[var(--accent)] hover:bg-[var(--background-secondary)] text-[var(--accent)] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer group ${className}`}
    >
      {isDark ? (
        <Sun
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
          strokeWidth={1.75}
        />
      ) : (
        <Moon
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
          strokeWidth={1.75}
        />
      )}
      <span className="sr-only">
        {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </span>
    </button>
  );
}
