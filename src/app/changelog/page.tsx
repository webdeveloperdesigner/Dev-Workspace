"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { PERSONAL_DATA } from "@/lib/data";
import {
  Search,
  Bot,
  ShieldCheck,
  Calendar,
  GitBranch,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface CommitLink {
  hash: string;
  shortHash: string;
  message: string;
  url: string;
}

interface ChangelogEntry {
  id: string;
  version: string;
  date: {
    en: string;
    hi: string;
  };
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  badge: {
    en: string;
    hi: string;
  };
  author: {
    name: string;
    role: string;
  };
  highlights?: {
    icon: React.ComponentType<{ className?: string }>;
    title: { en: string; hi: string };
    desc: { en: string; hi: string };
  }[];
  commits?: CommitLink[];
}

const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    id: "v2.0.0",
    version: "2.0.0",
    date: { en: "Oct 31, 2026", hi: "31 अक्टूबर 2026" },
    title: {
      en: "Fast AI Chat Assistant, Better Security & Clean Tech Stack",
      hi: "तेज AI चैट असिस्टेंट, बेहतर सुरक्षा और सही स्किल्स",
    },
    badge: { en: "Latest Version", hi: "नया वर्जन" },
    description: {
      en: "Added a super fast AI chat assistant (using Groq and Gemini) that answers questions about Vivek instantly. Added security to stop spam, and updated my skills list.",
      hi: "सुपर फास्ट AI चैट असिस्टेंट जोड़ा जो विवेक के बारे में तुरंत जवाब देता है। स्पैम रोकने के लिए सुरक्षा बढ़ाई और अपनी सही स्किल्स अपडेट कीं।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
    highlights: [
      {
        icon: Bot,
        title: { en: "Instant AI Replies", hi: "तुरंत AI जवाब" },
        desc: { en: "Answers in less than a second about projects and experience.", hi: "प्रोजेक्ट्स और अनुभव पर 1 सेकंड से भी कम में जवाब।" },
      },
      {
        icon: ShieldCheck,
        title: { en: "Safe & Spam-Free", hi: "सुरक्षित और स्पैम-फ्री" },
        desc: { en: "Protects against spam and fast bot messages.", hi: "स्पैम और बोट संदेशों से पूरी सुरक्षा।" },
      },
    ],
  },
  {
    id: "v1.9.0",
    version: "1.9.0",
    date: { en: "Oct 22, 2026", hi: "22 अक्टूबर 2026" },
    title: {
      en: "Easy Clickable Buttons for Email, LinkedIn & GitHub",
      hi: "Email, LinkedIn और GitHub के लिए आसान बटन",
    },
    badge: { en: "Design Update", hi: "डिज़ाइन अपडेट" },
    description: {
      en: "The AI bot now gives neat, colorful buttons so visitors can open Email, LinkedIn, or GitHub with one simple click.",
      hi: "AI बॉट अब सुंदर बटन देता है जिससे विज़िटर एक क्लिक में Email, LinkedIn या GitHub खोल सकें।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
    highlights: [
      {
        icon: Sparkles,
        title: { en: "One-Click Contact", hi: "एक-क्लिक संपर्क" },
        desc: { en: "Directly open mail or profile in a new tab.", hi: "नए टैब में सीधे मेल या प्रोफाइल खोलें।" },
      },
    ],
  },
  {
    id: "v1.8.0",
    version: "1.8.0",
    date: { en: "Sep 24, 2026", hi: "24 सितंबर 2026" },
    title: {
      en: "Fixed Website Loading & Speed Issues",
      hi: "वेबसाइट लोडिंग और स्पीड की समस्या ठीक की",
    },
    badge: { en: "Speed Fix", hi: "स्पीड फिक्स" },
    description: {
      en: "Fixed a background setting in Next.js so the portfolio loads smoothly and without errors.",
      hi: "Next.js में एक सेटिंग ठीक की ताकि पोर्टफोलियो बिना किसी एरर के जल्दी और आसानी से लोड हो सके।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
    commits: [
      {
        hash: "f6ab68fd3b147bb797c24a5ecf8f1fcb413f335c",
        shortHash: "f6ab68f",
        message: "fix(config): explicitly define Turbopack root directory",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/f6ab68fd3b147bb797c24a5ecf8f1fcb413f335c",
      },
    ],
  },
  {
    id: "v1.7.0",
    version: "1.7.0",
    date: { en: "Sep 15, 2026", hi: "15 सितंबर 2026" },
    title: {
      en: "Added 'What's New' Popup on Homepage",
      hi: "होमपेज पर 'क्या नया है' पॉपअप जोड़ा",
    },
    badge: { en: "New Feature", hi: "नया फीचर" },
    description: {
      en: "A beautiful popup appears on the homepage to show visitors all the latest features at a glance.",
      hi: "होमपेज पर एक सुंदर पॉपअप जोड़ा जो विज़िटर्स को नए फीचर्स एक नज़र में दिखाता है।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.6.0",
    version: "1.6.0",
    date: { en: "Sep 02, 2026", hi: "02 सितंबर 2026" },
    title: {
      en: "Live GitHub Projects Connected",
      hi: "लाइव GitHub प्रोजेक्ट्स को जोड़ा",
    },
    badge: { en: "GitHub Sync", hi: "GitHub सिंक" },
    description: {
      en: "Connected GitHub so anyone asking about code repositories gets real, updated links automatically.",
      hi: "GitHub को कनेक्ट किया ताकि कोड रिपॉजिटरी के बारे में पूछने पर असली और नए लिंक्स अपने आप मिलें।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.5.0",
    version: "1.5.0",
    date: { en: "Aug 02, 2026", hi: "02 अगस्त 2026" },
    title: {
      en: "Added Logo Icon, Updated Name & AI Bot Setup",
      hi: "लोगो आइकन जोड़ा, नाम अपडेट किया और AI बॉट सेटअप किया",
    },
    badge: { en: "Branding", hi: "ब्रांडिंग" },
    description: {
      en: "Added the glowing VK logo icon in browser tabs, updated my name to Vivek, set up project license, and started the AI companion.",
      hi: "ब्राउज़र टैब में चमकता हुआ VK लोगो आइकन जोड़ा, नाम विवेक सेट किया, लाइसेंस लगाया और AI साथी की शुरुआत की।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
    commits: [
      {
        hash: "d3b97a3b920c98388d034051bac21f0f7dd8ded7",
        shortHash: "d3b97a3",
        message: "Update LICENSE to strict All Rights Reserved Proprietary Agreement",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/d3b97a3b920c98388d034051bac21f0f7dd8ded7",
      },
      {
        hash: "61c83b1947d012e8b04f88a71b29e64d3573eba5",
        shortHash: "61c83b1",
        message: "Add custom VK favicon icon.svg",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/61c83b1947d012e8b04f88a71b29e64d3573eba5",
      },
      {
        hash: "43231ff951ee5f019c4aaa9972991e4e7ebacc72",
        shortHash: "43231ff",
        message: "Update name to Vivek in metadata",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/43231ff951ee5f019c4aaa9972991e4e7ebacc72",
      },
      {
        hash: "9cf1fe14aed663eb3a7827fccb65c31d48c00e1c",
        shortHash: "9cf1fe1",
        message: "Initial commit: Dev-Workspace Portfolio & AI Companion",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/9cf1fe14aed663eb3a7827fccb65c31d48c00e1c",
      },
    ],
  },
  {
    id: "v1.4.0",
    version: "1.4.0",
    date: { en: "Aug 01, 2026", hi: "01 अगस्त 2026" },
    title: {
      en: "Added BodhAI Learning Project",
      hi: "BodhAI लर्निंग प्रोजेक्ट जोड़ा",
    },
    badge: { en: "Project", hi: "प्रोजेक्ट" },
    description: {
      en: "Added full details of BodhAI—an AI practice platform with quiz questions and code runner for students.",
      hi: "BodhAI प्रोजेक्ट का पूरा विवरण जोड़ा—छात्रों के लिए क्विज़ और कोड रनर वाला AI अभ्यास प्लेटफॉर्म।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.3.0",
    version: "1.3.0",
    date: { en: "Jul 31, 2026", hi: "31 जुलाई 2026" },
    title: {
      en: "Added Blockchain & Smart Contracts Info",
      hi: "ब्लॉकचेन और स्मार्ट कॉन्ट्रैक्ट्स की जानकारी जोड़ी",
    },
    badge: { en: "Web3", hi: "Web3" },
    description: {
      en: "Added my Solidity, Ethereum, and Web3 skills so visitors know about my blockchain background.",
      hi: "Solidity, Ethereum और Web3 स्किल्स जोड़ीं ताकि लोग मेरे ब्लॉकचेन अनुभव के बारे में जान सकें।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.2.0",
    version: "1.2.0",
    date: { en: "Jul 31, 2026", hi: "31 जुलाई 2026" },
    title: {
      en: "Easy Mobile Bottom Menu",
      hi: "आसान मोबाइल बॉटम मेनू",
    },
    badge: { en: "Mobile Menu", hi: "मोबाइल मेनू" },
    description: {
      en: "Created a floating bottom menu so you can easily switch pages on mobile phones.",
      hi: "स्क्रीन के नीचे तैरता हुआ मेनू बनाया ताकि फोन पर किसी भी पेज पर आसानी से जा सकें।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.1.0",
    version: "1.1.0",
    date: { en: "Jul 30, 2026", hi: "30 जुलाई 2026" },
    title: {
      en: "English & Hindi Language Switch",
      hi: "अंग्रेजी और हिंदी भाषा बदलने की सुविधा",
    },
    badge: { en: "Languages", hi: "भाषाएं" },
    description: {
      en: "Added a language button to easily switch the entire portfolio between English and Hindi.",
      hi: "एक बटन जोड़ा जिससे पूरा पोर्टफोलियो आसानी से अंग्रेजी और हिंदी में बदल जाता है।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v1.0.0",
    version: "1.0.0",
    date: { en: "Jul 30, 2026", hi: "30 जुलाई 2026" },
    title: {
      en: "First Code Upload on GitHub",
      hi: "GitHub पर पहला कोड अपलोड",
    },
    badge: { en: "First Commit", hi: "पहला कमिट" },
    description: {
      en: "Started the website code using Next.js and uploaded the first version to GitHub.",
      hi: "Next.js का उपयोग करके वेबसाइट बनाई और GitHub पर पहला कोड अपलोड किया।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
    commits: [
      {
        hash: "3155a135ab59170ecdad22efe1f6f914065eafe3",
        shortHash: "3155a13",
        message: "Initial commit from Create Next App",
        url: "https://github.com/webdeveloperdesigner/Dev-Workspace/commit/3155a135ab59170ecdad22efe1f6f914065eafe3",
      },
    ],
  },
  {
    id: "v0.9.0",
    version: "0.9.0",
    date: { en: "Jul 26, 2026", hi: "26 जुलाई 2026" },
    title: {
      en: "Added Dark & Light Mode",
      hi: "डार्क और लाइट मोड जोड़ा",
    },
    badge: { en: "Themes", hi: "थीम्स" },
    description: {
      en: "Made sure the site looks clean and comfortable in both dark mode and light mode.",
      hi: "वेबसाइट को डार्क मोड और लाइट मोड दोनों में साफ और आंखों के लिए आरामदायक बनाया।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.8.0",
    version: "0.8.0",
    date: { en: "Jul 22, 2026", hi: "22 जुलाई 2026" },
    title: {
      en: "Subtle Animated Background",
      hi: "हल्का एनिमेटेड बैकग्राउंड",
    },
    badge: { en: "Animation", hi: "एनीमेशन" },
    description: {
      en: "Added soft glowing grid squares in the background for a modern developer look.",
      hi: "बैकग्राउंड में हल्का चमकता हुआ ग्रिड जोड़ा जो वेबसाइट को मॉडर्न लुक देता है।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.7.0",
    version: "0.7.0",
    date: { en: "Jul 18, 2026", hi: "18 जुलाई 2026" },
    title: {
      en: "Added Work Experience & College Community Sections",
      hi: "कार्य अनुभव और कॉलेज कम्युनिटी सेक्शन जोड़े",
    },
    badge: { en: "Experience", hi: "अनुभव" },
    description: {
      en: "Added clickable open/close cards for GLA University and TechCentrals activities.",
      hi: "GLA यूनिवर्सिटी और TechCentrals गतिविधियों के लिए खुलने और बंद होने वाले कार्ड जोड़े।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.6.0",
    version: "0.6.0",
    date: { en: "Jul 15, 2026", hi: "15 जुलाई 2026" },
    title: {
      en: "Added Project Details & How to Run Guides",
      hi: "प्रोजेक्ट का विवरण और चलाने का तरीका जोड़ा",
    },
    badge: { en: "Projects", hi: "प्रोजेक्ट्स" },
    description: {
      en: "Created separate pages for each project with step-by-step installation guides.",
      hi: "प्रत्येक प्रोजेक्ट के लिए अलग पेज बनाए जिसमें इसे चलाने के आसान तरीके बताए गए हैं।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.5.0",
    version: "0.5.0",
    date: { en: "Jul 12, 2026", hi: "12 जुलाई 2026" },
    title: {
      en: "Added Certificates & Hackathons",
      hi: "प्रमाणपत्र और हैकाथॉन जोड़े",
    },
    badge: { en: "Certificates", hi: "प्रमाणपत्र" },
    description: {
      en: "Added Oracle Cloud AI, IIT Madras Shaastra 2026, and GLA Hackathon achievements.",
      hi: "Oracle Cloud AI, IIT मद्रास और GLA हैकाथॉन की उपलब्धियां जोड़ीं।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.4.0",
    version: "0.4.0",
    date: { en: "Jul 09, 2026", hi: "09 जुलाई 2026" },
    title: {
      en: "Added Live Clock & Location",
      hi: "लाइव घड़ी और लोकेशन जोड़ी",
    },
    badge: { en: "Header", hi: "हेडर" },
    description: {
      en: "Added a real-time digital clock showing Indian Standard Time (IST) and location in the header.",
      hi: "हेडर में लाइव भारतीय समय (IST) और लोकेशन दिखाने वाली डिजिटल घड़ी जोड़ी।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.3.0",
    version: "0.3.0",
    date: { en: "Jul 06, 2026", hi: "06 जुलाई 2026" },
    title: {
      en: "Organized Profile Data & Skills File",
      hi: "प्रोफाइल डेटा और स्किल्स की फाइल तैयार की",
    },
    badge: { en: "Data Setup", hi: "डेटा सेटअप" },
    description: {
      en: "Created a central file to cleanly store all projects, experience, and contact information.",
      hi: "सभी प्रोजेक्ट्स, अनुभव और संपर्क जानकारी को साफ तरीके से रखने के लिए डेटा फाइल बनाई।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.2.0",
    version: "0.2.0",
    date: { en: "Jul 03, 2026", hi: "03 जुलाई 2026" },
    title: {
      en: "Designed Website Layout on Figma",
      hi: "Figma पर वेबसाइट का डिज़ाइन बनाया",
    },
    badge: { en: "Design", hi: "डिज़ाइन" },
    description: {
      en: "Drew wireframes and planned how the cards, colors, and layout would look before writing code.",
      hi: "कोडिंग शुरू करने से पहले तय किया कि कार्ड्स, कलर्स और लेआउट कैसा दिखेगा।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
  {
    id: "v0.1.0",
    version: "0.1.0",
    date: { en: "Jul 01, 2026", hi: "01 जुलाई 2026" },
    title: {
      en: "Project Started",
      hi: "प्रोजेक्ट की शुरुआत",
    },
    badge: { en: "Start", hi: "शुरुआत" },
    description: {
      en: "Started the journey: planned to build a personal developer portfolio featuring BodhAI and Blockchain work.",
      hi: "सफर की शुरुआत: BodhAI और ब्लॉकचेन काम को दिखाने के लिए पोर्टफोलियो बनाने की योजना बनाई।",
    },
    author: { name: PERSONAL_DATA.name, role: "Full-Stack & Blockchain Developer" },
  },
];

export default function ChangelogPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const isHindi = language === "hi";

  const filteredChangelog = CHANGELOG_DATA.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const titleMatch = item.title.en.toLowerCase().includes(q) || item.title.hi.toLowerCase().includes(q);
    const descMatch = item.description.en.toLowerCase().includes(q) || item.description.hi.toLowerCase().includes(q);
    const verMatch = item.version.toLowerCase().includes(q);
    const commitMatch = item.commits?.some((c) => c.message.toLowerCase().includes(q) || c.shortHash.toLowerCase().includes(q));
    return titleMatch || descMatch || verMatch || commitMatch;
  });

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-300">
      
      {/* Header Section: Mobile stacked, Desktop two columns */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-border/60">
        <div className="space-y-1.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-tight text-foreground font-sans">
              Changelog
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Active Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-mono">
            {isHindi
              ? "संस्करण अपडेट: 0.1.0 – 2.0.0 | 2026"
              : "Version updates: 0.1.0 – 2.0.0 | 2026"}
          </p>
        </div>

        {/* Action Controls: Full-width on mobile, right-aligned on desktop */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-end lg:items-center gap-2.5 w-full md:w-auto">
          {/* Search Bar: Full width on mobile */}
          <div className="relative w-full sm:flex-1 md:w-60 lg:w-64">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? "अपडेट खोजें (जैसे 1.5, 2.0)..." : "Search updates..."}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-full bg-muted/50 border border-border/70 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              suppressHydrationWarning
            />
          </div>

          {/* Social Quick Links: Wraps neatly on smaller screens */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <a
              href="https://github.com/webdeveloperdesigner/Dev-Workspace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-card hover:bg-muted text-foreground transition-colors"
            >
              <FaGithub className="size-3" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-card hover:bg-muted text-foreground transition-colors"
            >
              <FaLinkedin className="size-3 text-[#0A66C2]" />
              <span>Connect</span>
            </a>
            <a
              href={`mailto:${PERSONAL_DATA.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-card hover:bg-muted text-foreground transition-colors"
            >
              <Mail className="size-3 text-emerald-500" />
              <span>Subscribe</span>
            </a>
          </div>
        </div>
      </div>

      {/* Vertical Timeline: Perfectly centered markers & glowing line */}
      <div className="relative pl-7 sm:pl-9 space-y-9 sm:space-y-11">
        
        {/* Continuous Green Line with Subtle Glow */}
        <div className="absolute left-[11px] sm:left-[15px] -translate-x-1/2 top-3 bottom-3 w-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] pointer-events-none" />

        {filteredChangelog.map((entry, idx) => {
          const isLatest = idx === 0;

          return (
            <div key={entry.id} className="relative group">
              
              {/* Timeline Marker: Perfectly centered on the green line */}
              <div className="absolute left-[-17px] sm:left-[-21px] -translate-x-1/2 top-1.5 flex items-center justify-center">
                {isLatest ? (
                  // Active Marker: Green-filled circle with ping glow
                  <div className="relative size-3.5 sm:size-4 rounded-full bg-emerald-500 border-2 border-background shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10 transition-transform group-hover:scale-125">
                    <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
                  </div>
                ) : (
                  // Upcoming/Previous Steps: Crisp white-filled circles
                  <div className="size-3 sm:size-3.5 rounded-full bg-white border-2 border-background z-10 transition-transform group-hover:scale-125 shadow-xs" />
                )}
              </div>

              {/* Content Container */}
              <div className="space-y-2">
                
                {/* Date, Version & Status Labels next to circle */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                  <span className="font-mono text-muted-foreground font-medium flex items-center gap-1 text-[11px] sm:text-xs">
                    <Calendar className="size-3" />
                    {isHindi ? entry.date.hi : entry.date.en}
                  </span>
                  <span className="font-mono font-bold px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/60 text-[11px] sm:text-xs">
                    v{entry.version}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                      isLatest
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {isLatest ? (isHindi ? "सक्रिय रिलीज़" : "Active Release") : (isHindi ? entry.badge.hi : entry.badge.en)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-2 text-[19px] sm:text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground hover:text-primary transition-colors">
                  {isHindi ? entry.title.hi : entry.title.en}
                </h2>

                {/* Description */}
                <p className="mt-2 text-[13px] sm:text-sm leading-6 text-zinc-400">
                  {isHindi ? entry.description.hi : entry.description.en}
                </p>

                {/* Verified GitHub Commits */}
                {entry.commits && entry.commits.length > 0 && (
                  <div className="space-y-1.5 pt-1.5">
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <GitBranch className="size-3 text-primary" />
                      <span>{isHindi ? "गिटहब कमिट लिंक" : "GitHub Commit Links"}</span>
                    </span>
                    <div className="rounded-xl border border-border/60 bg-muted/20 divide-y divide-border/40 overflow-hidden">
                      {entry.commits.map((commit, cIdx) => (
                        <a
                          key={cIdx}
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 flex items-center justify-between gap-2.5 text-xs hover:bg-muted/50 transition-colors group/commit"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-[10px] sm:text-[11px] font-bold border border-border/60 shrink-0">
                              {commit.shortHash}
                            </code>
                            <span className="text-foreground group-hover/commit:text-primary transition-colors truncate text-[11px] sm:text-xs">
                              {commit.message}
                            </span>
                          </div>
                          <ExternalLink className="size-3 text-muted-foreground/60 group-hover/commit:text-primary transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature Highlights Grid: 1 column on mobile, 2 columns on desktop */}
                {entry.highlights && entry.highlights.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {entry.highlights.map((item, hIdx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={hIdx}
                          className="p-3 rounded-xl border border-border/60 bg-card/60 hover:bg-card hover:border-border transition-all flex items-start gap-2.5"
                        >
                          <div className="size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="size-3.5" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-semibold text-foreground tracking-tight">
                              {isHindi ? item.title.hi : item.title.en}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              {isHindi ? item.desc.hi : item.desc.en}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Author Signature */}
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                  <div className="size-5 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shrink-0 flex items-center justify-center shadow-xs">
                    <div className="size-full rounded-full bg-card flex items-center justify-center font-bold text-[8px] text-foreground">
                      VK
                    </div>
                  </div>
                  <span className="font-semibold text-foreground text-xs">{entry.author.name}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{entry.author.role}</span>
                </div>

              </div>
            </div>
          );
        })}

        {filteredChangelog.length === 0 && (
          <div className="py-12 text-center text-xs text-muted-foreground">
            {isHindi ? "कोई परिणाम नहीं मिला।" : "No updates found for your search."}
          </div>
        )}

      </div>
    </div>
  );
}
