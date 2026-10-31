"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Bot,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  CalendarDays,
  Zap,
} from "lucide-react";

interface UpdateItem {
  id: number;
  date: string;
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: "emerald" | "blue" | "purple";
  tag: string;
}

const updates: UpdateItem[] = [
  {
    id: 1,
    date: "OCT 31, 2026",
    category: "NEW FEATURE",
    title: "Live AI Assistant",
    description:
      "Integrated Groq and Gemini AI for real-time conversations. Ask about projects, blockchain experience, and full-stack technologies.",
    icon: Bot,
    color: "emerald",
    tag: "Featured",
  },
  {
    id: 2,
    date: "OCT 31, 2026",
    category: "TECH STACK",
    title: "Updated Technologies & Skills",
    description:
      "Improved technology portfolio showcasing TypeScript, Next.js, Solidity, Web3.js, OpenCV, FastAPI, and cloud deployment.",
    icon: Layers,
    color: "blue",
    tag: "Updated",
  },
  {
    id: 3,
    date: "OCT 31, 2026",
    category: "SECURITY",
    title: "Enterprise Security & Performance",
    description:
      "Enhanced security with HSTS, clickjacking prevention, API rate limiting, and optimized dark-mode rendering.",
    icon: ShieldCheck,
    color: "purple",
    tag: "Improved",
  },
];

const colors = {
  emerald: {
    icon: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    iconBorder: "border-emerald-400/20",
    line: "bg-emerald-400/30",
    dot: "bg-emerald-400",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    glow: "group-hover:shadow-emerald-500/5",
  },
  blue: {
    icon: "text-blue-400",
    iconBg: "bg-blue-400/10",
    iconBorder: "border-blue-400/20",
    line: "bg-blue-400/30",
    dot: "bg-blue-400",
    badge: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    glow: "group-hover:shadow-blue-500/5",
  },
  purple: {
    icon: "text-purple-400",
    iconBg: "bg-purple-400/10",
    iconBorder: "border-purple-400/20",
    line: "bg-purple-400/30",
    dot: "bg-purple-400",
    badge: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    glow: "group-hover:shadow-purple-500/5",
  },
};

function TimelineItem({
  item,
  index,
  last,
}: {
  item: UpdateItem;
  index: number;
  last: boolean;
}) {
  const Icon = item.icon;
  const theme = colors[item.color];

  return (
    <div
      className="group relative flex gap-4 sm:gap-5 animate-in fade-in duration-300"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Timeline */}
      <div className="relative flex flex-col items-center">
        <div
          className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl border ${theme.iconBg} ${theme.iconBorder}
          transition-all duration-300 group-hover:scale-110
          group-hover:shadow-lg ${theme.glow}`}
        >
          <Icon size={20} className={theme.icon} />
        </div>

        {!last && (
          <div className="my-2 w-px flex-1 bg-gradient-to-b from-white/20 to-white/5" />
        )}
      </div>

      {/* Content */}
      <div className={`mb-6 min-w-0 flex-1 ${last ? "mb-0" : ""}`}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.18em] text-zinc-500">
            {item.date}
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider ${theme.badge}`}
          >
            {item.category}
          </span>
        </div>

        <div
          className="rounded-2xl border border-white/[0.06] bg-white/[0.025]
          p-4 transition-all duration-300
          hover:border-white/[0.12] hover:bg-white/[0.045]
          hover:-translate-y-0.5"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-zinc-100 sm:text-base">
              {item.title}
            </h3>

            <ArrowUpRight
              size={16}
              className="shrink-0 text-zinc-600 transition-colors group-hover:text-emerald-400"
            />
          </div>

          <p className="text-xs leading-6 text-zinc-400 sm:text-[13px]">
            {item.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            <span className="text-[10px] text-zinc-500">
              {item.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatsNewPopup({ onClose }: { onClose?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("whats_new_popup_custom_v3");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 250);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = React.useCallback(() => {
    sessionStorage.setItem("whats_new_popup_custom_v3", "true");
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center
      bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whats-new-title"
        className="relative flex max-h-[90vh] w-full max-w-[540px]
        flex-col overflow-hidden rounded-[24px]
        border border-white/[0.09]
        bg-[#111214] text-white shadow-[0_25px_100px_rgba(0,0,0,0.65)]
        animate-in zoom-in-95 duration-150"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 -top-32
          h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-[100px]" />

        {/* Header */}
        <div className="relative flex items-center justify-between
          border-b border-white/[0.07] px-5 py-5 sm:px-7">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center
              rounded-xl border border-emerald-400/30
              bg-emerald-400/[0.08]">
              <Sparkles size={21} className="text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="whats-new-title"
                  className="text-lg font-bold tracking-tight"
                >
                  What&apos;s New
                </h2>

                <span className="rounded-full border border-emerald-400/20
                  bg-emerald-400/10 px-2 py-0.5 text-[10px]
                  font-bold text-emerald-400">
                  v2.0
                </span>
              </div>

              <p className="mt-1 flex items-center gap-1.5
                text-[11px] text-zinc-500">
                <CalendarDays size={12} />
                Recent portfolio highlights &amp; updates
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-zinc-500
              transition hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X size={19} />
          </button>
        </div>

        {/* Latest release label */}
        <div className="relative flex items-center justify-between
          px-5 pt-5 sm:px-7">
          <div className="flex items-center gap-2">
            <Zap size={13} className="text-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.2em]
              text-emerald-400">
              RELEASE TIMELINE
            </span>
          </div>

          <span className="text-[10px] text-zinc-600">
            03 UPDATES
          </span>
        </div>

        {/* Timeline content */}
        <div className="relative min-h-0 flex-1 overflow-y-auto
          px-5 py-5 sm:px-7
          [scrollbar-width:thin]
          [scrollbar-color:#3f3f46_transparent]">

          {updates.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              last={index === updates.length - 1}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-between
          gap-3 border-t border-white/[0.07]
          bg-white/[0.015] px-5 py-4 sm:px-7">

          <Link
            href="/changelog"
            onClick={handleClose}
            className="group inline-flex items-center gap-1.5
              text-xs font-medium text-zinc-400
              transition hover:text-emerald-400"
          >
            View changelog
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5
              group-hover:translate-x-0.5"
            />
          </Link>

          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 rounded-xl
              bg-zinc-100 px-5 py-2.5 text-xs font-bold
              text-zinc-950 transition-all
              hover:bg-emerald-400 hover:shadow-lg
              hover:shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 size={15} />
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhatsNewPopup;
