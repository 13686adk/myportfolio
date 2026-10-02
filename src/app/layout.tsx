import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site, projects } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** TODO: set NEXT_PUBLIC_SITE_URL to your deployed domain (e.g. https://yourname.vercel.app) */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = `${site.name} — ${site.role}`;
const description = site.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: `${site.name} Portfolio`,
  keywords: [
    site.name,
    site.role,
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "React Native",
    "Flutter",
    "Tailwind CSS",
    "Portfolio",
    "Nigeria",
    "Web Developer",
  ],
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description,
    url: siteUrl,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    sameAs: [
      site.socials.github,
      site.socials.linkedin,
      site.socials.x,
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Flutter",
      "Tailwind CSS",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
    },
  };

  const projectListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.repo ?? p.demo ?? siteUrl,
        keywords: p.stack.join(", "),
      },
    })),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListJsonLd) }}
        />
      </body>
    </html>
  );
}