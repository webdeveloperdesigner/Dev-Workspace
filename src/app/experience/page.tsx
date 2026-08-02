"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { EXPERIENCES } from "@/lib/data";
import { Briefcase, Calendar, MapPin, Building2, ArrowLeft } from "lucide-react";

export default function ExperiencePage() {
  const { language } = useLanguage();
  const t = dictionary[language].experiencePage;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === "hi" ? "मुख्य पृष्ठ पर वापस जाएं" : "Back to Home"}</span>
        </Link>
      </div>

      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <span>{t.title}</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative border-l border-border/80 ml-3 pl-6 space-y-8">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline dot indicator */}
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background bg-foreground group-hover:scale-125 transition-transform" />

            <div className="p-5 rounded-xl border border-border/70 bg-card/60 glass-card space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{exp.role}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {exp.company} • <MapPin className="w-3 h-3 inline" /> {exp.location}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border/50 self-start sm:self-auto flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>

              <p className="text-xs text-foreground/90 leading-relaxed">
                {exp.description[language]}
              </p>

              <ul className="space-y-1.5 list-disc list-inside text-xs text-muted-foreground">
                {exp.highlights[language].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
