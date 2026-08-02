"use client";

import React, { useState } from "react";
import { Experience } from "@/lib/data";
import { useLanguage } from "./language-provider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Building2 } from "lucide-react";

interface ExperienceAccordionProps {
  experiences: Experience[];
}

export function ExperienceAccordion({ experiences }: ExperienceAccordionProps) {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(experiences[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {experiences.map((exp) => {
        const isOpen = openId === exp.id;
        return (
          <div
            key={exp.id}
            className="rounded-xl border border-border/70 bg-card/60 transition-all duration-200 hover:border-border overflow-hidden glass-card"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggle(exp.id)}
              className="w-full p-4 flex items-center justify-between gap-4 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-muted/80 flex items-center justify-center text-foreground font-bold text-xs border border-border shrink-0">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary truncate">
                    {exp.role}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="font-semibold text-foreground shrink-0">{exp.company}</span>
                    <span className="shrink-0">•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <MapPin className="w-3.5 h-3.5 inline shrink-0" />
                      <span>{exp.location}</span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded border border-border/50 hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{exp.period}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </div>
            </button>

            {/* Accordion Content with Framer Motion */}
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
                <p className="text-foreground/90 font-semibold">
                  {exp.description[language]}
                </p>

                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  {exp.highlights[language].map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
