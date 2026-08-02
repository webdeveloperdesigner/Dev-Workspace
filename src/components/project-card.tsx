"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/lib/data";
import { useLanguage } from "./language-provider";
import { dictionary } from "@/lib/dictionary";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const t = dictionary[language].projectsPage;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="group rounded-xl border border-border/70 bg-card/60 hover:border-border/100 overflow-hidden transition-all duration-200 glass-card flex flex-col justify-between"
    >
      {/* Project Image Banner */}
      <div className="relative h-44 w-full bg-muted overflow-hidden border-b border-border/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Website & Source buttons overlay (Arfazrll style) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 text-foreground backdrop-blur-md text-[11px] font-medium border border-border shadow-xs hover:bg-background transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Website</span>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 text-foreground backdrop-blur-md text-[11px] font-medium border border-border shadow-xs hover:bg-background transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.simpleicons.org/github"
              alt="GitHub"
              className="w-3 h-3 dark:invert object-contain"
            />
            <span>Source</span>
          </a>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/projects/${project.slug}`} className="group-hover:underline">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
            {project.description[language]}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>{t.viewProject}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
