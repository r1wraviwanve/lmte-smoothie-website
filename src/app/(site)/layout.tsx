import { ReactNode } from "react";
import { NavigationDrawer } from "@/components/site/NavigationDrawer";
import { HeaderActions } from "@/components/site/HeaderActions";
import { CinematicFooterTitle } from "@/components/site/CinematicFooterTitle";
import { FooterSocialIcons } from "@/components/site/SocialLinks";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] relative">
      <NavigationDrawer />
      <HeaderActions />

      <main className="flex-1 w-full relative">{children}</main>

      <footer id="contact" className="border-t border-[var(--border)] bg-[var(--background-footer)] text-[var(--foreground)] py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 flex flex-col items-center justify-center text-center">
          {/* 1. Cinematic Rohit Dandawate Title */}
          <div className="w-full flex justify-center mb-2">
            <CinematicFooterTitle />
          </div>

          {/* 2. Circular Social Media Icons */}
          <FooterSocialIcons />

          {/* 3. Centered Copyright matching reference */}
          <p className="text-[var(--muted-text)] font-sans text-sm md:text-base tracking-wider mt-4">
            Copyright {new Date().getFullYear()}. Rohit Dandawate
          </p>
        </div>
      </footer>
    </div>
  );
}
