"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "./language-provider";
import { dictionary } from "@/lib/dictionary";
import { PERSONAL_DATA } from "@/lib/data";
import {
  Home,
  FileText,
  Mail,
  Sun,
  Moon,
  Globe,
  Bot,
  ChevronUp,
  Briefcase,
  FolderGit2,
  Wrench,
  BookOpen,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

interface NavigationDockProps {
  onOpenAiDrawer?: () => void;
}

const emptySubscribe = () => () => {};

export function NavigationDock({ onOpenAiDrawer }: NavigationDockProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = dictionary[language].nav;
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  // Handle scroll auto-hide effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const allPages = [
    { href: "/", label: t.home, icon: Home },
    { href: "/projects", label: t.projects, icon: FolderGit2 },
    { href: "/skills", label: t.skills, icon: Wrench },
    { href: "/experience", label: t.experience, icon: Briefcase },
    { href: "/achievements", label: "Achievements", icon: BookOpen },
    { href: "/blog", label: t.blog, icon: FileText },
    { href: "/contact", label: t.contact, icon: Mail },
  ];

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto z-60 flex flex-col items-center justify-center max-w-[95vw] w-max transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      {/* Quick Navigation Drawer Popup on Chevron (ᐱ) click */}
      {isPagesOpen && (
        <div className="mb-3 p-3 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl space-y-2 animate-in slide-in-from-bottom-2 fade-in duration-200 min-w-[260px] sm:min-w-[280px]">
          <div className="flex items-center justify-between border-b border-border/60 pb-2 px-1">
            <span className="text-xs font-bold text-foreground">
              {language === "hi" ? "सभी पेज (Explore Pages)" : "Explore All Pages"}
            </span>
            <button
              onClick={() => setIsPagesOpen(false)}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {allPages.map((page) => {
              const Icon = page.icon;
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setIsPagesOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all duration-150 hover:scale-105 ${
                    isActive
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span>{page.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Floating Dock Bar Container */}
      <div className="glass px-2 sm:px-3 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-2xl border border-border/80 bg-background/85 backdrop-blur-md overflow-x-auto max-w-full">
        
        {/* GROUP 1: Home & Resume */}
        {/* 1. Home */}
        <Link
          href="/"
          title={t.home}
          className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1 ${
            pathname === "/"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          {pathname === "/" && (
            <span className="absolute -top-0.5 sm:-top-1 left-1/2 -translate-x-1/2 size-1 sm:size-1.5 rounded-full bg-blue-500 shadow-xs" />
          )}
          <span className="sr-only">{t.home}</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            {t.home}
          </span>
        </Link>

        {/* 2. Resume */}
        <a
          href={PERSONAL_DATA.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={t.resume}
          className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">{t.resume}</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            {t.resume}
          </span>
        </a>

        {/* DIVIDER 1 */}
        <div className="w-[1px] h-4 sm:h-5 bg-border/80 mx-0.5 sm:mx-1 shrink-0" />

        {/* GROUP 2: LinkedIn, AI, Email, More (Desktop shows GitHub & LeetCode as well) */}
        {/* GitHub (Visible on Desktop) */}
        <a
          href={PERSONAL_DATA.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="hidden sm:flex relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 ease-out group items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">GitHub</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            GitHub
          </span>
        </a>

        {/* LeetCode (Visible on Desktop) */}
        <a
          href={PERSONAL_DATA.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          title="LeetCode"
          className="hidden sm:flex relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-[#FFA116] hover:bg-muted/80 transition-all duration-200 ease-out group items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <SiLeetcode className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">LeetCode</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            LeetCode
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href={PERSONAL_DATA.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-[#0A66C2] hover:bg-muted/80 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">LinkedIn</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            LinkedIn
          </span>
        </a>

        {/* AI Assistant Drawer Button */}
        {onOpenAiDrawer && (
          <button
            onClick={onOpenAiDrawer}
            title="Ask AI Assistant"
            className="relative p-2 sm:p-2.5 rounded-full text-emerald-500 hover:bg-emerald-500/10 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse transition-transform group-hover:scale-110" />
            <span className="sr-only">AI Assistant</span>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-emerald-600 text-white px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
              Ask AI Assistant
            </span>
          </button>
        )}

        {/* Email Contact */}
        <a
          href={`mailto:${PERSONAL_DATA.email}`}
          title={t.contact}
          className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">{t.contact}</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            {t.contact}
          </span>
        </a>

        {/* Chevron Up (ᐱ) Expand All Pages Button (More) */}
        <button
          onClick={() => setIsPagesOpen(!isPagesOpen)}
          title="All Pages Menu (ᐱ)"
          className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1 ${
            isPagesOpen
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <ChevronUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isPagesOpen ? "rotate-180" : ""}`} />
          <span className="sr-only">All Pages</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            {language === "hi" ? "सभी पेज (Menu)" : "All Pages (Menu)"}
          </span>
        </button>

        {/* DIVIDER 2 */}
        <div className="w-[1px] h-4 sm:h-5 bg-border/80 mx-0.5 sm:mx-1 shrink-0" />

        {/* GROUP 3: Language & Theme */}
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          title={t.lang}
          className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          <span className="text-[8px] sm:text-[9px] font-bold uppercase ml-0.5 sm:ml-1">{language}</span>
          <span className="sr-only">{t.lang}</span>
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
            {language === "en" ? "हिंदी (Hindi)" : "English"}
          </span>
        </button>

        {/* Theme Switcher */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={t.theme}
            className="relative p-2 sm:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 ease-out group flex items-center justify-center hover:scale-125 sm:hover:scale-130 hover:-translate-y-0.5 sm:hover:-translate-y-1"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 transition-transform group-hover:scale-110" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 transition-transform group-hover:scale-110" />
            )}
            <span className="sr-only">{t.theme}</span>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 text-[11px] font-medium bg-foreground text-background px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none hidden sm:block">
              {t.theme}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
