"use client";

import React, { useState } from "react";
import { Organization } from "@/lib/data";
import { useLanguage } from "./language-provider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Calendar, Users } from "lucide-react";

interface OrganizationAccordionProps {
  organizations: Organization[];
}

export function OrganizationAccordion({ organizations }: OrganizationAccordionProps) {
  const { language } = useLanguage();
  // By default, leave all closed or the first one open; null means all start closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {organizations.map((org, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-border/70 bg-card/60 transition-all duration-200 hover:border-border overflow-hidden glass-card"
          >
            {/* Accordion Header Button */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shrink-0 overflow-hidden p-0.5">
                  {org.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={org.imageUrl}
                      alt={org.name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <Users className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                    {org.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-primary truncate mt-0.5">
                    {org.role[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded border border-border/50 hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{org.period}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </div>
            </button>

            {/* Accordion Content with smooth expand/collapse */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 border-t border-border/40 text-xs sm:text-sm leading-relaxed space-y-3">
                    <div className="sm:hidden flex items-center gap-1.5 text-xs font-mono text-muted-foreground pt-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{org.period}</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {org.description[language]}
                    </p>

                    {/* Tags */}
                    {org.tags && org.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {org.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

