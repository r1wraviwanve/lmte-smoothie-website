"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Track active section for navigation indication
  useEffect(() => {
    const sectionIds = ["home", "about", "work", "gpta", "impact", "media", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { num: "01", label: "Home", href: "#home" },
    { num: "02", label: "About Us", href: "#about" },
    { num: "03", label: "Areas of Work", href: "#work" },
    { num: "04", label: "GPTA", href: "#gpta" },
    { num: "05", label: "Impact", href: "#impact" },
    { num: "06", label: "Media", href: "#media" },
    { num: "07", label: "Contact Us", href: "#contact" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 left-8 z-40 w-12 h-12 rounded-full bg-[var(--background-secondary)]/90 backdrop-blur-md flex flex-col items-center justify-center space-y-1.5 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--background-secondary)] shadow-[0_4px_20px_var(--shadow-color)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Open Navigation"
      >
        <span className="block w-5 h-[1.5px] bg-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5"></span>
        <span className="block w-5 h-[1.5px] bg-[var(--accent)] transition-all duration-300 group-hover:w-6"></span>
        <span className="block w-5 h-[1.5px] bg-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0.5"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--background)]/98 backdrop-blur-xl flex flex-col border-l border-[var(--border)]"
          >
            <div className="p-8 flex justify-between items-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:bg-[var(--background-secondary)] hover:rotate-90 hover:scale-105 transition-all duration-300 text-[var(--accent)] cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
              </button>
              <span className="text-xs tracking-[0.2em] uppercase font-sans font-medium text-[var(--muted-text)]">Navigation</span>
            </div>

            <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      key={item.num}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04 + 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center group border-b border-[var(--border-subtle)] pb-4 hover:pl-2 transition-all duration-300"
                    >
                      <span className="text-xs font-sans w-14 text-[var(--muted-text)] flex items-center gap-1.5">
                        {item.num}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        )}
                      </span>
                      <span
                        className={`font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-[var(--primary-text)] group-hover:text-[var(--accent)]"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`ml-auto transition-all duration-300 text-[var(--accent)] ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        ↗
                      </span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            <div className="p-8 flex justify-between items-center border-t border-[var(--border-subtle)] text-xs font-sans tracking-widest text-[var(--muted-text)] uppercase">
              <span>Rohit Dandawate</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
