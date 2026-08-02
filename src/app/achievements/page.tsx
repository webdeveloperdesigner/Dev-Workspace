"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { CERTIFICATIONS, Certification } from "@/lib/data";
import {
  ArrowLeft,
  Award,
  Trophy,
  ExternalLink,
  X,
  Maximize2,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AchievementsPage() {
  const { language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Certification", "Workshop", "Hackathon"];

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase()) ||
      cert.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-dvh py-12 pb-24 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{language === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}</span>
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <Trophy className="w-3.5 h-3.5" />
          <span>{language === "hi" ? "उपलब्धियां" : "Achievements & Honors"}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          {language === "hi" ? "पुरस्कार एवं प्रमाणपत्र" : "Awards & Certifications"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {language === "hi"
            ? "शैक्षणिक और व्यावसायिक यात्रा के दौरान अर्जित प्रमुख प्रमाणपत्र, पुरस्कार और मान्यताएं।"
            : "Verified certifications, technical workshops, and hackathon recognitions earned throughout my software engineering journey."}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === "hi"
                ? "प्रमाणपत्र या संस्था खोजें..."
                : "Search by title, issuer, or skill..."
            }
            className="w-full text-xs bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary glass"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                  : "bg-card/60 text-muted-foreground border-border hover:border-border/100 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      {filteredCerts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/30">
          <p className="text-xs text-muted-foreground">
            No achievements found matching your search.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-2 text-xs text-primary underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="group rounded-2xl border border-border/70 bg-card/60 glass-card overflow-hidden flex flex-col justify-between hover:border-border transition-all duration-300 shadow-xs hover:shadow-lg"
            >
              {/* Certificate Image Banner */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-48 w-full bg-muted overflow-hidden cursor-pointer border-b border-border/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Category & Date Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/80 text-primary-foreground backdrop-blur-md text-[10px] font-semibold border border-primary/30 shadow-xs">
                    {cert.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-background/90 text-foreground backdrop-blur-md text-[11px] font-mono font-medium border border-border shadow-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    {cert.date}
                  </span>
                </div>

                {/* Preview Hover Trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="absolute bottom-3 right-3 px-2.5 py-1.2 rounded-xl bg-background/90 text-foreground backdrop-blur-md border border-border shadow-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-medium"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-primary" />
                  <span>Preview Image</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="text-base font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer leading-snug"
                  >
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center border border-border/50 shrink-0">
                      {cert.logoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={cert.logoUrl}
                          alt={cert.issuer}
                          className="w-3.5 h-3.5 object-contain dark:invert"
                        />
                      ) : (
                        <Award className="w-3.5 h-3.5 text-primary" />
                      )}
                    </div>
                    <span className="font-medium text-foreground/90">{cert.issuer}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />
                  </div>
                </div>

                {/* Tech Tags */}
                <div>
                  {cert.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Verify Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors pt-2 border-t border-border/40 w-full justify-between"
                    >
                      <span>{language === "hi" ? "प्रमाणपत्र सत्यापित करें" : "Verify Credential"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Full Image Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden glass flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2 min-w-0 pr-4">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="text-sm font-bold text-foreground truncate">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Certificate Image */}
              <div className="p-4 bg-black/40 flex items-center justify-center">
                <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain bg-black/20"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-muted/30">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{selectedCert.issuer}</span> • {selectedCert.date}
                </div>
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>{language === "hi" ? "सत्यापित करें" : "Verify Credential"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
