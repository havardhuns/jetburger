import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { UMAMI_WEBSITE_ID } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false });
  const title = data?.seoTitle ?? "Jetburger – Evje";
  const description = data?.seoDescription ?? undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Jetburger",
      locale: "nb_NO",
      type: "website",
      images: data?.heroImage?.asset
        ? [{ url: urlFor(data.heroImage).width(1200).height(630).fit("crop").url(), width: 1200, height: 630 }]
        : undefined,
    },
  };
}

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
        {/* data-domains keeps localhost and preview deploys out of the stats */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains="jetburger.no"
        />
      </body>
    </html>
  );
}
