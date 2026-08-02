"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { GALLERY_ITEMS } from "@/lib/data";
import { ArrowLeft, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-dvh py-12 pb-24 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{language === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}</span>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{language === "hi" ? "गैलरी" : "Gallery & Events"}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          {language === "hi" ? "स्मृतियां एवं गतिविधियां" : "Gallery & Event Highlights"}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {language === "hi"
            ? "विवेक के हैकाथॉन, वर्कशॉप और प्रोजेक्ट लॉन्च की झलकियां।"
            : "Highlights and photos from hackathons, technical workshops, and project milestones."}
        </p>
      </div>

      {/* Main Interactive Carousel */}
      <div className="relative group rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GALLERY_ITEMS[currentIndex].imageUrl}
            alt={GALLERY_ITEMS[currentIndex].title[language]}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-2">
              {GALLERY_ITEMS[currentIndex].category[language]}
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-snug">
              {GALLERY_ITEMS[currentIndex].title[language]}
            </p>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 hover:bg-background text-foreground border border-border flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
          title="Previous Image"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 hover:bg-background text-foreground border border-border flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
          title="Next Image"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Grid Thumbnail Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {GALLERY_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-xl border overflow-hidden text-left transition-all duration-200 ${
              currentIndex === idx
                ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                : "border-border/70 hover:border-border opacity-80 hover:opacity-100"
            }`}
          >
            <div className="h-32 w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title[language]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-card">
              <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">
                {item.category[language]}
              </span>
              <p className="text-xs font-bold text-foreground line-clamp-1">
                {item.title[language]}
              </p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
