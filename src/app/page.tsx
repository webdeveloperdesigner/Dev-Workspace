"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/dictionary";
import {
  PERSONAL_DATA,
  EXPERIENCES,
  PROJECTS,
  EDUCATIONS,
  CERTIFICATIONS,
  ORGANIZATIONS,
  GALLERY_ITEMS,
  SKILL_GROUPS,
} from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { HeaderClock } from "@/components/header-clock";
import { ExperienceAccordion } from "@/components/experience-accordion";
import { ProjectCard } from "@/components/project-card";
import {
  BadgeCheck,
  ArrowUpRight,
  GraduationCap,
  Mail,
  Users,
  MapPin,
  Wrench,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

export default function HomePage() {
  const { language } = useLanguage();
  const t = dictionary[language];
  const [galleryIndex, setGalleryIndex] = useState(0);

  const prevGallery = () => {
    setGalleryIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const nextGallery = () => {
    setGalleryIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Profile Header */}
      <section className="space-y-6">
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight flex items-center gap-2">
              <span>{PERSONAL_DATA.name}</span>
              <span title={t.hero.verified}>
                <BadgeCheck className="size-7 md:size-8 text-[#1DA1F2] fill-[#1DA1F2]/20 inline-block -mt-1" />
              </span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              {PERSONAL_DATA.title}
            </p>

            {/* Status, Location & Clock Pills (100% single line on PC/Laptop) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2 shrink-0">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-foreground">{t.hero.availableStatus}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="hidden sm:inline-block text-muted-foreground/40">•</span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <MapPin className="size-3.5 text-muted-foreground" />
                  <span className="font-medium">{t.hero.locationText}</span>
                </div>

                <span className="text-muted-foreground/60 font-light select-none shrink-0">|</span>

                <div className="shrink-0">
                  <HeaderClock />
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Ring with Dropdown Arrow (Arfazrll style) */}
          <div className="relative inline-block shrink-0 group">
            <div className="relative flex shrink-0 overflow-hidden size-24 md:size-28 border rounded-full shadow-lg ring-4 ring-muted bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card font-bold text-xl md:text-2xl text-foreground">
                VK
              </div>
            </div>
            <Link
              href="/contact"
              className="absolute -bottom-1 -right-1 size-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted transition-transform group-hover:scale-110 shadow-md"
              title="Contact Page"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        {/* Quick Social & Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={`mailto:${PERSONAL_DATA.email}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.hero.contactBtn}</span>
          </a>
          <a
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors"
            title="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_DATA.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground hover:text-[#FFA116] transition-colors"
            title="LeetCode"
          >
            <SiLeetcode className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground hover:text-[#0A66C2] transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_DATA.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground hover:text-[#1F8ACB] transition-colors"
            title="Codeforces"
          >
            <SiCodeforces className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 1. Dedicated About Section */}
      <section id="about" className="space-y-3 pt-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {t.sections.about}
        </h2>
        <div className="p-5 rounded-2xl border border-border/70 bg-card/60 glass-card">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
            {t.hero.aboutText}
          </p>
        </div>
      </section>

      {/* 2. Work Experience Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <span>{t.sections.experience}</span>
          </h2>
          <Link
            href="/experience"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-1"
          >
            <span>Timeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ExperienceAccordion experiences={EXPERIENCES} />
      </section>

      {/* 3. Education Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span>{t.sections.education}</span>
        </h2>

        <div className="space-y-3">
          {EDUCATIONS.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card/60 glass-card space-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {edu.degree[language]}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {edu.institution} • {edu.location}
                {edu.gpa && <span className="ml-2 font-mono text-xs text-emerald-500 font-semibold">GPA: {edu.gpa}</span>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Organizations & Leadership Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <span>{t.sections.organizations}</span>
        </h2>

        <div className="space-y-3">
          {ORGANIZATIONS.map((org, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card/60 glass-card space-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {org.name}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {org.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-primary">{org.role[language]}</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                {org.description[language]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Skills Showcase Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            <span>{t.sections.skills}</span>
          </h2>
          <Link
            href="/skills"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-1"
          >
            <span>{t.sections.viewAllSkills}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {SKILL_GROUPS.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title[language]}
              </h3>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.slice(0, 6).map((item: { name: string; icon?: string; color?: string }) => {
                  if (group.type === "icon") {
                    return (
                      <div
                        key={item.name}
                        className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-7 sm:h-8 w-fit px-3 flex items-center gap-2"
                      >
                        {item.icon && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="size-3.5 sm:size-4 rounded object-contain dark:invert"
                          />
                        )}
                        <span className="text-foreground text-xs font-medium">
                          {item.name}
                        </span>
                      </div>
                    );
                  }

                  if (group.type === "badge") {
                    return (
                      <div
                        key={item.name}
                        className={`border bg-background ring-2 rounded-xl h-7 sm:h-8 w-fit px-3 flex items-center transition-colors duration-300 ${
                          item.color || "border-border ring-border/20"
                        }`}
                      >
                        <span className="text-foreground text-xs font-medium">
                          {item.name}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.name}
                      className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-7 sm:h-8 w-fit px-3 flex items-center"
                    >
                      <span className="text-foreground text-xs font-medium">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Projects Section */}
      <section className="space-y-4 text-center py-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-3 w-full my-1">
            <div className="h-[1px] flex-1 bg-border/80 max-w-[120px] sm:max-w-[200px]" />
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-foreground text-background text-xs font-semibold shadow-xs shrink-0">
              <span>{language === "hi" ? "Works (प्रोजेक्ट्स)" : "Works"}</span>
            </div>
            <div className="h-[1px] flex-1 bg-border/80 max-w-[120px] sm:max-w-[200px]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground pt-1">
            {language === "hi" ? "मेरा नवीनतम कार्य देखें" : "Check out my latest work"}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
            {language === "hi"
              ? "मैंने AI/ML प्रणालियों से लेकर फुल-स्टैक वेब अनुप्रयोगों तक विभिन्न प्रकार की परियोजनाओं पर काम किया है।"
              : "I've worked on a variety of projects, from AI/ML systems to full-stack web applications. Here are a few of my favorites."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4">
          {PROJECTS.filter((p) => p.featured).slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* 6. Certifications & Achievements Section */}
      <section className="space-y-4 text-center py-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-3 w-full my-1">
            <div className="h-[1px] flex-1 bg-border/80 max-w-[120px] sm:max-w-[200px]" />
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-foreground text-background text-xs font-semibold shadow-xs shrink-0">
              <span>{language === "hi" ? "उपलब्धियां" : "Achievements"}</span>
            </div>
            <div className="h-[1px] flex-1 bg-border/80 max-w-[120px] sm:max-w-[200px]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground pt-1">
            {language === "hi" ? "पुरस्कार एवं प्रमाणपत्र" : "Awards & Certifications"}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
            {language === "hi"
              ? "अपनी शैक्षणिक और व्यावसायिक यात्रा के दौरान, मैंने AI, मशीन लर्निंग और वेब विकास में प्रमाणपत्र प्राप्त किए हैं।"
              : "Throughout my academic and professional journey, I've earned certifications across AI, Machine Learning, Cloud Computing, and Full Stack Development."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card/60 glass-card flex items-center justify-between hover:border-border transition-colors"
            >
              <div>
                <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md border border-border/40 shrink-0 ml-2">
                {cert.date}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link
            href="/achievements"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-4 py-2 inline-flex items-center gap-1.5 group"
          >
            <span>{language === "hi" ? "सभी उपलब्धियां देखें" : "View All Achievements"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. Gallery Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {language === "hi" ? "गैलरी (Gallery)" : "Gallery"}
          </h2>
          <Link
            href="/gallery"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
          >
            <span>{language === "hi" ? "सभी गैलरी देखें" : "View All Gallery"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="relative group pt-2">
          {/* Gallery Carousel Card */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GALLERY_ITEMS[galleryIndex].imageUrl}
              alt={GALLERY_ITEMS[galleryIndex].title[language]}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-left">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 w-fit mb-1">
                {GALLERY_ITEMS[galleryIndex].category[language]}
              </span>
              <p className="text-sm font-bold text-white leading-snug">
                {GALLERY_ITEMS[galleryIndex].title[language]}
              </p>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevGallery}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 hover:bg-background text-foreground border border-border flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
            title="Previous Image"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextGallery}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 hover:bg-background text-foreground border border-border flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
            title="Next Image"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      {/* 8. Writings / Blog Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {language === "hi" ? "लेख (Writings)" : "Writings"}
          </h2>
          <Link
            href="/blog"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
          >
            <span>{language === "hi" ? "सभी लेख पढ़ें" : "Read All Writings"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="space-y-3">
          {BLOG_POSTS.slice(0, 2).map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-4 rounded-xl border border-border/70 bg-card/60 glass-card flex items-center justify-between hover:border-border transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  0{idx + 1}.
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {post.date}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Contact / CTA Section */}
      <section className="relative text-center pt-8 pb-4">
        {/* Contact Pill Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-5 py-1 rounded-full bg-foreground text-background text-xs font-semibold shadow-md border border-border/20">
            <span>{language === "hi" ? "संपर्क" : "Contact"}</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="p-8 sm:p-12 rounded-3xl border border-border/80 bg-card/70 glass-card space-y-4 pt-10">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {language === "hi" ? "संपर्क करें" : "Get in Touch"}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {language === "hi" ? (
              <>
                सहयोग करना चाहते हैं या कोई प्रश्न है? मुझसे{" "}
                <a
                  href={PERSONAL_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  LinkedIn
                </a>{" "}
                पर संपर्क करें या मुझे एक{" "}
                <a
                  href={`mailto:${PERSONAL_DATA.email}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  ईमेल
                </a>{" "}
                भेजें। मैं हमेशा नए अवसरों और चर्चाओं के लिए तैयार हूं।
              </>
            ) : (
              <>
                Want to collaborate or have a question? Reach out to me on{" "}
                <a
                  href={PERSONAL_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  LinkedIn
                </a>{" "}
                or send me an{" "}
                <a
                  href={`mailto:${PERSONAL_DATA.email}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  email
                </a>
                . I&apos;m always open to new opportunities and discussions.
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
