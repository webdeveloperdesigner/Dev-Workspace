"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BookOpen, Search, Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";

export default function BlogPage() {
  const { language } = useLanguage();
  const t = dictionary[language].blogPage;
  const [search, setSearch] = useState("");

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

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
          <BookOpen className="w-5 h-5 text-primary" />
          <span>{t.title}</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Search Bar */}
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

      {/* Article List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-5 rounded-xl border border-border/70 bg-card/60 hover:border-border transition-all duration-200 glass-card space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} {t.readTime}
              </span>
            </div>

            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt[language]}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-xs">
          No articles found matching your search.
        </div>
      )}
    </div>
  );
}
