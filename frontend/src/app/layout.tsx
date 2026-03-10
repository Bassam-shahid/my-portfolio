import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/smooth-scroll";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bassam Shahid | Full Stack & Agentic AI Developer",
  description: "6+ years experienced Full Stack & Agentic AI Developer. I architect intelligent agents, scalable web platforms, and automation that thinks ahead.",
  keywords: ["Full Stack Developer", "Agentic AI", "AI Engineer", "React", "Next.js", "Python", "LangChain", "Machine Learning"],
  authors: [{ name: "Bassam Shahid" }],
  creator: "Bassam Shahid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bassam.dev",
    title: "Bassam Shahid | Full Stack & Agentic AI Developer",
    description: "6+ years experienced Full Stack & Agentic AI Developer. I architect intelligent agents, scalable web platforms, and automation that thinks ahead.",
    siteName: "Bassam Shahid Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bassam Shahid | Full Stack & Agentic AI Developer",
    description: "6+ years experienced Full Stack & Agentic AI Developer.",
    creator: "@bassam",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
