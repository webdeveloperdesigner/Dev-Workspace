"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { NavigationDock } from "@/components/navigation-dock";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { FlickeringGrid } from "@/components/flickering-grid";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <div className="relative min-h-screen flex flex-col items-center justify-between antialiased selection:bg-primary selection:text-primary-foreground">
          {/* Flickering background grid pattern */}
          <FlickeringGrid />

          {/* Main max-w-2xl Container */}
          <main className="w-full max-w-2xl px-4 sm:px-6 pt-10 pb-28 flex-1">
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
