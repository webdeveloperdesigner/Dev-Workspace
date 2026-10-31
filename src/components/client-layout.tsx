"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { NavigationDock } from "@/components/navigation-dock";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { FlickeringGrid } from "@/components/flickering-grid";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Allow Changelog page to expand to wide layout (max-w-5xl), while preserving max-w-2xl for other portfolio pages
  const isChangelog = pathname === "/changelog";

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <div className="relative min-h-screen flex flex-col items-center justify-between antialiased selection:bg-primary selection:text-primary-foreground">
          {/* Flickering background grid pattern */}
          <FlickeringGrid />

          {/* Main Container - Expands for Changelog to full comfortable width */}
          <main
            className={`w-full px-4 sm:px-6 md:px-8 pt-10 pb-28 flex-1 transition-all duration-300 ${
              isChangelog ? "max-w-4xl lg:max-w-5xl" : "max-w-2xl"
            }`}
          >
            {children}
          </main>

          {/* Floating Navigation Dock */}
          <NavigationDock onOpenAiDrawer={() => setIsAiOpen(true)} />

          {/* AI Chat Drawer */}
          <AiAssistantDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
