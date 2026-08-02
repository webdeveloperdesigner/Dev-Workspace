"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import { PERSONAL_DATA } from "@/lib/data";
import {
  Mail,
  Globe,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = dictionary[language].contactPage;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      name: "Primary Email",
      handle: PERSONAL_DATA.email,
      icon: Mail,
      href: `mailto:${PERSONAL_DATA.email}`,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
    {
      name: "Academic Email",
      handle: "vivek.glacs22@gla.ac.in",
      icon: Mail,
      href: "mailto:vivek.glacs22@gla.ac.in",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Phone",
      handle: "+91-8765728985",
      icon: Globe,
      href: "tel:+918765728985",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Schedule Meeting",
      handle: "cal.com/devxvivek/meeting",
      icon: ExternalLink,
      href: "https://cal.com/devxvivek/meeting",
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      name: "GitHub",
      handle: "github.com/webdeveloperdesigner",
      icon: FaGithub,
      href: PERSONAL_DATA.github,
      color: "text-foreground bg-muted border-border",
    },
    {
      name: "LinkedIn",
      handle: "linkedin.com/in/vivek-vns",
      icon: FaLinkedin,
      href: PERSONAL_DATA.linkedin,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      name: "LeetCode",
      handle: "leetcode.com/u/Vivek_cs",
      icon: SiLeetcode,
      href: PERSONAL_DATA.leetcode,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Codeforces",
      handle: "codeforces.com/profile/Vivek_csed",
      icon: SiCodeforces,
      href: PERSONAL_DATA.codeforces,
      color: "text-red-500 bg-red-500/10 border-red-500/20",
    },
    {
      name: "Instagram",
      handle: "instagram.com/_.heyiamvivek._",
      icon: FaInstagram,
      href: "https://www.instagram.com/_.heyiamvivek._/",
      color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    },
  ];

  return (
    <main className="min-h-dvh py-12 pb-24 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === "hi" ? "मुख्य पृष्ठ पर वापस जाएं" : "Back to Home"}</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Mail className="w-6 h-6 text-primary" />
          <span>{t.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Copy Email Card */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/60 glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Direct Email
          </span>
          <p className="text-base font-bold text-foreground mt-0.5">
            {PERSONAL_DATA.email}
          </p>
        </div>

        <button
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition-all shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copied : t.copyEmail}</span>
        </button>
      </div>

      {/* Social Platforms Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {language === "hi" ? "अन्य प्लेटफ़ॉर्म" : "Direct Channels & Profiles"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-border/70 bg-card/60 hover:border-border glass-card flex items-center justify-between group transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-xl border ${p.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">{p.handle}</p>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
