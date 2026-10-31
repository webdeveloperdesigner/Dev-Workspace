"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  Wrench,
  Bot,
  X,
  Check,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export function MaintenancePopup() {
  const { language: currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<"en" | "hi">(
    currentLang === "hi" ? "hi" : "en"
  );

  useEffect(() => {
    const dismissed = sessionStorage.getItem("maintenance_notice_dismissed");
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    setActiveLangTab(currentLang === "hi" ? "hi" : "en");
  }, [currentLang]);

  const handleDismiss = () => {
    sessionStorage.setItem("maintenance_notice_dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Container: Luxury Editorial Bento-Box Modal */}
      <div className="relative w-full max-w-4xl rounded-3xl border border-amber-500/25 bg-card/95 text-foreground shadow-[0_0_80px_-20px_rgba(245,158,11,0.3)] glass overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Ambient Glow Lines */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-background/80 hover:bg-background border border-border text-muted-foreground hover:text-foreground backdrop-blur-md transition-all shadow-md"
          title="Close Notice"
        >
          <X className="size-4" />
        </button>

        {/* Bento Grid Wrapper */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
          
          {/* ================= LEFT COLUMN: TOP MAIN CARD + BOTTOM 2 CARDS (7 Cols) ================= */}
          <div className="md:col-span-7 flex flex-col gap-4">
            
            {/* Top Left Card: Headline & Main Notice */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-background/80 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden">
              <div className="space-y-3">
                {/* Overline & Language Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                    MAINTENANCE &amp; SYSTEM UPGRADE
                  </span>

                  {/* Language Switcher */}
                  <div className="flex items-center gap-1 bg-muted p-1 rounded-xl text-[11px] font-mono border border-border/60">
                    <button
                      onClick={() => setActiveLangTab("en")}
                      className={`px-2.5 py-0.5 rounded-lg transition-all ${
                        activeLangTab === "en"
                          ? "bg-background text-foreground font-bold shadow-xs"
                          : "text-muted-foreground"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setActiveLangTab("hi")}
                      className={`px-2.5 py-0.5 rounded-lg transition-all ${
                        activeLangTab === "hi"
                          ? "bg-background text-foreground font-bold shadow-xs"
                          : "text-muted-foreground"
                      }`}
                    >
                      HI
                    </button>
                  </div>
                </div>

                {/* Elegant Serif Headline */}
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-serif leading-tight">
                  {activeLangTab === "hi"
                    ? "उत्कृष्टता के लिए डिजिटल प्लेटफॉर्म का नवीनीकरण"
                    : "Refining Systems for Unforgettable Experiences"}
                </h2>

                {/* Sub-description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeLangTab === "hi"
                    ? "वर्तमान में कोड सुधार, AI असिस्टेंट सेवाओं और पोर्टफोलियो डेटा सिंक पर कार्य चल रहा है। कुछ सेवाएं अस्थायी रूप से अपडेट हो सकती हैं।"
                    : "Active maintenance and optimizations are currently in progress across codebase architecture, AI Assistant services, and live data pipelines."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleDismiss}
                  className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
                >
                  <Check className="size-4" />
                  <span>{activeLangTab === "hi" ? "समझ गया / जारी रखें" : "GOT IT, CONTINUE"}</span>
                </button>

                <Link
                  href="/maintenance"
                  onClick={handleDismiss}
                  className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors flex items-center gap-1.5 group"
                >
                  <span>{activeLangTab === "hi" ? "स्थिति जांचें" : "EXPLORE STATUS"}</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom Left: 2 Bento Square Image/Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bento 1: AI Assistant Engine */}
              <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 space-y-2 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
                  <span>AI ASSISTANT</span>
                  <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Gemini &amp; Groq Optimization</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">85% Fixes Resolved</p>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-amber-500 w-[85%]" />
                </div>
              </div>

              {/* Bento 2: Emerald Cut Data Pipeline */}
              <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 space-y-2 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                  <span>DATA PIPELINE</span>
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Real-Time Sync Engine</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Turbopack &amp; Cache Clear</p>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-emerald-500 w-[100%]" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: EDITORIAL HERO FEATURE MODULE (5 Cols) ================= */}
          <div className="md:col-span-5 relative rounded-2xl border border-border/80 bg-gradient-to-b from-card via-background to-card p-6 flex flex-col justify-between space-y-6 overflow-hidden min-h-[320px]">
            
            {/* Cinematic Center Graphic Icon */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 pt-4">
              <div className="relative p-5 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-500 shadow-2xl">
                <Wrench className="size-10 text-amber-500 animate-pulse" />
                <div className="absolute inset-0 rounded-3xl bg-amber-500/10 blur-xl pointer-events-none" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <Sparkles className="size-3" />
                  <span>CRAFTING QUALITY</span>
                </span>
                <h3 className="text-lg font-bold text-foreground font-serif">
                  Architectural Precision
                </h3>
              </div>
            </div>

            {/* Floating Dark Info Widgets at Bottom (Asymmetrical Bento overlay) */}
            <div className="space-y-2 relative z-10 pt-2">
              <Link
                href="/maintenance"
                onClick={handleDismiss}
                className="group p-3 rounded-xl border border-border/80 bg-black/60 backdrop-blur-md flex items-center justify-between hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-semibold text-white">
                    Codebase Refactoring Progress
                  </span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/maintenance"
                onClick={handleDismiss}
                className="group p-3 rounded-xl border border-border/80 bg-black/60 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-white">
                    AI Latency &amp; Memory Safety
                  </span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
