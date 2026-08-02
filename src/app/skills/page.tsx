"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  TECH_STACK_ITEMS,
  TOOLS_ITEMS,
  HARD_SKILLS_DATA,
  SOFT_SKILLS_DATA,
} from "@/lib/data";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsPage() {
  const { language } = useLanguage();
  const [hardSkillsOpen, setHardSkillsOpen] = useState(true);
  const [softSkillsOpen, setSoftSkillsOpen] = useState(true);

  // Badge level color generator
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case "EXPERT":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "ADVANCED":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "INTERMEDIATE":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "BEGINNER":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <main className="min-h-dvh py-10 pb-28 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl border border-border/70 bg-card/60 w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{language === "hi" ? "मुख्य पृष्ठ पर वापस जाएं" : "Back to Home"}</span>
      </Link>

      {/* Header Title */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          {language === "hi" ? "कौशल और विशेषज्ञता" : "Skills & Expertise"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {language === "hi"
            ? "मेरी तकनीकी स्टैक, विशेषज्ञता क्षेत्रों और उपकरणों का पूर्ण अवलोकन।"
            : "A complete overview of my technical stack, expertise areas, and tools."}
        </p>
      </div>

      {/* 1. Tech Stack Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          {language === "hi" ? "टेक स्टैक" : "Tech Stack"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {TECH_STACK_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/70 hover:border-border transition-all duration-200 shadow-2xs glass-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5 object-contain shrink-0 dark:invert"
              />
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Tools Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          {language === "hi" ? "टूल्स" : "Tools"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {TOOLS_ITEMS.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/70 hover:border-border transition-all duration-200 shadow-2xs glass-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-5 h-5 object-contain shrink-0 dark:invert"
              />
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hard Skills Section (Collapsible Accordion) */}
      <section className="border-t border-border/60 pt-6 space-y-4">
        <button
          onClick={() => setHardSkillsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between group py-1 text-left"
        >
          <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {language === "hi" ? "हार्ड स्किल्स" : "Hard Skills"}
          </h2>
          <div className="p-1 rounded-lg text-muted-foreground group-hover:text-foreground">
            {hardSkillsOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {hardSkillsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden space-y-6 pt-2"
            >
              {HARD_SKILLS_DATA.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                    {cat.category[language]}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-2xl border border-border/70 bg-card/60 glass-card space-y-2 flex flex-col justify-between hover:border-border transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-foreground">
                            {skill.name}
                          </h4>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {skill.description[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Soft Skills Section (Collapsible Accordion) */}
      <section className="border-t border-border/60 pt-6 space-y-4">
        <button
          onClick={() => setSoftSkillsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between group py-1 text-left"
        >
          <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {language === "hi" ? "सॉफ्ट स्किल्स" : "Soft Skills"}
          </h2>
          <div className="p-1 rounded-lg text-muted-foreground group-hover:text-foreground">
            {softSkillsOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {softSkillsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden pt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOFT_SKILLS_DATA.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-2xl border border-border/70 bg-card/60 glass-card space-y-1 hover:border-border transition-colors"
                  >
                    <h4 className="text-sm font-bold text-foreground">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {skill.description[language]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
