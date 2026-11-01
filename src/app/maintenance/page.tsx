"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  AlertTriangle,
  Wrench,
  Bot,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function MaintenancePage() {
  const { language: currentLang } = useLanguage();
  const [langTab, setLangTab] = useState<"en" | "hi">(currentLang === "hi" ? "hi" : "en");

  const modules = [
    {
      name: "AI Assistant Engine",
      status: "In Repair",
      progress: 80,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: Bot,
    },
    {
      name: "Portfolio Data Sync",
      status: "Updating",
      progress: 90,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: RefreshCw,
    },
    {
      name: "Next.js 16 Turbopack",
      status: "Operational",
      progress: 100,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      icon: CheckCircle2,
    },
    {
      name: "Core UI & Navigation",
      status: "Operational",
      progress: 100,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-8 text-center py-12 animate-in fade-in duration-300">
      {/* Top Ambient Glow */}
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-emerald-500/30 blur-2xl animate-pulse pointer-events-none" />

        {/* Central Wrench & Tech Icon */}
        <div className="relative p-5 rounded-3xl bg-card border border-amber-500/30 shadow-2xl glass flex items-center justify-center">
          <Wrench className="size-12 text-amber-500 animate-pulse" />
        </div>
      </div>

      {/* Main Title Header */}
      <div className="space-y-3 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-sm">
          <AlertTriangle className="size-3.5" />
          <span>System Optimization Mode</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          {langTab === "hi" ? "सक्रिय सुधार एवं अपडेट" : "System Maintenance & Status"}
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {langTab === "hi"
            ? "हम वेबसाइट प्रदर्शन, AI असिस्टेंट और डेटा सिंक को और अधिक बेहतर बनाने के लिए काम कर रहे हैं।"
            : "We are actively upgrading system architecture, AI Assistant integration, and live data pipelines."}
        </p>
      </div>

      {/* Language Toggle Control */}
      <div className="flex items-center gap-2 bg-muted/60 p-1.5 rounded-2xl border border-border/60 text-xs shadow-inner">
        <button
          onClick={() => setLangTab("en")}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            langTab === "en"
              ? "bg-background text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>🇬🇧 English Notice</span>
        </button>
        <button
          onClick={() => setLangTab("hi")}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            langTab === "hi"
              ? "bg-background text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>🇮🇳 हिंदी संदेश</span>
        </button>
      </div>

      {/* Main Glass Status Card */}
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/80 glass-card space-y-6 text-left shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <Terminal className="size-4 text-amber-500" />
            <span>MAINTENANCE_STATUS_LOG.MD</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="size-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase">ACTIVE WORK</span>
          </div>
        </div>

        {/* Selected Language Statement */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-700 dark:text-amber-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5" />
              {langTab === "hi" ? "आधिकारिक संदेश" : "Official Notice Statement"}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300">
              UPDATED
            </span>
          </div>

          {langTab === "en" ? (
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              &ldquo;Active maintenance and optimizations are in progress across codebase, AI Assistant integration, and portfolio data sync. We are actively working on resolving remaining issues.&rdquo;
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              &ldquo;वर्तमान में कोड सुधार, AI असिस्टेंट सेवाओं और डेटा सिंक पर कार्य चल रहा है। कुछ सुविधाएं अस्थायी रूप से अपडेट हो सकती हैं।&rdquo;
            </p>
          )}
        </div>

        {/* Module Health Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            {langTab === "hi" ? "मॉड्यूल प्रगति ट्रैकर" : "Module Progress Tracker"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {modules.map((m, idx) => {
              const IconComp = m.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border/70 bg-background/60 space-y-2 hover:border-border transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <IconComp className={`size-4 ${m.color}`} />
                      <span>{m.name}</span>
                    </div>

                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${m.bg} ${m.color} font-semibold`}>
                      {m.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>Completion</span>
                      <span className="font-semibold text-foreground">{m.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          m.progress === 100
                            ? "bg-emerald-500"
                            : "bg-gradient-to-r from-amber-500 to-orange-500"
                        }`}
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Return to Home CTA */}
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background text-xs sm:text-sm font-bold hover:opacity-90 transition-all shadow-xl hover:scale-105"
        >
          <ArrowLeft className="size-4" />
          <span>{langTab === "hi" ? "मुख्य पृष्ठ पर लौटें" : "Back to Home Page"}</span>
        </Link>
      </div>
    </div>
  );
}
