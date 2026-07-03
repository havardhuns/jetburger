import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jetburger – Evje",
  description:
    "Hjemmelagde burgere, hjemmelaget pizza og sprø fries — laget fra bunnen, midt i Evje sentrum. Åpent alle dager 15:00–22:00.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={cn("h-full", "antialiased", "font-sans", archivo.variable, geistMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
