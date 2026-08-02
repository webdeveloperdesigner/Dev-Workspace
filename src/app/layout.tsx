import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";

export const metadata: Metadata = {
  title: "Vivek | Full Stack Engineer",
  description: "Modern, minimal personal portfolio website inspired by Arfazrll/Dev-Workspace.",
  keywords: ["Vivek", "Portfolio", "Full Stack Engineer", "Next.js", "React", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
