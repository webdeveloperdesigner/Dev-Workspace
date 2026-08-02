"use client";

import React, { use } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { BLOG_POSTS } from "@/lib/blog-data";
import { PERSONAL_DATA } from "@/lib/data";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";

interface BlogArticleProps {
  params: Promise<{ slug: string }>;
}

export default function BlogArticlePage({ params }: BlogArticleProps) {
  const resolvedParams = use(params);
  const { language } = useLanguage();
  const t = dictionary[language].blogPage;

  const targetSlug = resolvedParams.slug;
  const post = BLOG_POSTS.find(
    (p) => p.slug === targetSlug || p.aliases?.includes(targetSlug)
  );

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Article Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested blog post could not be found.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-primary underline font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === "hi" ? "सभी ब्लॉग देखें" : "Return to Blog"}</span>
        </Link>
      </div>
    );
  }

  // Simple Markdown inline parser helper
  const renderFormattedText = (text: string) => {
    // Bold replacement
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-primary border border-border/50"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{language === "hi" ? "ब्लॉग पर वापस जाएं" : "Back to Blog"}</span>
      </Link>

      {/* Header Meta */}
      <div className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5 text-foreground font-sans font-medium">
            <User className="w-3.5 h-3.5 text-primary" />
            {PERSONAL_DATA.name}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} {t.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50 flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Render Markdown Content */}
      <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-foreground/90">
        {post.content[language].split("\n\n").map((block, idx) => {
          const trimmed = block.trim();

          if (trimmed.startsWith("# ")) {
            return (
              <h1 key={idx} className="text-xl font-bold text-foreground tracking-tight mt-6">
                {trimmed.replace("# ", "")}
              </h1>
            );
          }

          if (trimmed.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-base font-semibold text-foreground tracking-tight mt-6 border-b border-border/60 pb-1.5">
                {trimmed.replace("## ", "")}
              </h2>
            );
          }

          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-sm font-semibold text-foreground tracking-tight mt-4">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }

          if (trimmed.startsWith("> ")) {
            return (
              <blockquote
                key={idx}
                className="p-4 rounded-xl border-l-4 border-primary bg-muted/40 italic text-muted-foreground my-4"
              >
                {renderFormattedText(trimmed.replace("> ", "").replace(/^"|"$/g, ""))}
              </blockquote>
            );
          }

          if (trimmed.startsWith("```")) {
            const cleanCode = trimmed.replace(/```[a-z]*/g, "").trim();
            return (
              <pre
                key={idx}
                className="p-4 rounded-xl bg-card border border-border font-mono text-xs overflow-x-auto my-4 text-foreground"
              >
                <code>{cleanCode}</code>
              </pre>
            );
          }

          if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
            const items = trimmed.split("\n").map((item) => item.replace(/^(-|\d+\.)\s*/, ""));
            return (
              <ul key={idx} className="space-y-2 list-disc list-inside text-muted-foreground my-2 pl-2">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderFormattedText(item)}</li>
                ))}
              </ul>
            );
          }

          return <p key={idx}>{renderFormattedText(trimmed)}</p>;
        })}
      </article>
    </div>
  );
}
