"use client";

import React, { use } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { PROJECTS } from "@/lib/data";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = use(params);
  const { language } = useLanguage();
  const t = dictionary[language].projectsPage;

  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Project Not Found</h2>
        <Link
          href="/projects"
          className="text-xs text-primary underline hover:opacity-80"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4 border-b border-border pb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.longDescription[language]}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.liveDemo}</span>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.githubRepo}</span>
          </a>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-muted text-foreground border border-border/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{t.keyFeatures}</span>
        </h3>
        <div className="p-4 rounded-xl border border-border bg-card/60 glass-card">
          <ul className="space-y-2 text-xs text-foreground/90">
            {project.features[language].map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>{t.challenges}</span>
        </h3>
        <div className="p-4 rounded-xl border border-border bg-card/60 glass-card space-y-3 text-xs">
          <div>
            <span className="font-semibold text-amber-500 flex items-center gap-1 mb-1">
              Challenge:
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {project.challenges[language]}
            </p>
          </div>
          <div>
            <span className="font-semibold text-emerald-500 flex items-center gap-1 mb-1">
              <Lightbulb className="w-3.5 h-3.5 inline" /> Solution:
            </span>
            <p className="text-foreground/90 leading-relaxed">
              {project.solution[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span>{t.installation}</span>
        </h3>
        <div className="p-4 rounded-xl border border-border bg-muted/70 font-mono text-xs text-foreground space-y-2 overflow-x-auto">
          {project.installationSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-muted-foreground">$</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
