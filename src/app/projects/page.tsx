"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { PROJECTS } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { FolderGit2, Search, ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = dictionary[language].projectsPage;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Fullstack", "Frontend", "AI/ML", "Tools"];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description[language].toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
          <FolderGit2 className="w-5 h-5 text-primary" />
          <span>{t.title}</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full text-xs bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary glass"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                selectedCategory === cat
                  ? "bg-foreground text-background font-medium border-foreground"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {cat === "All" ? t.all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-xs">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
}
