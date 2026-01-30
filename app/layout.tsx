import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "M Karthikeya Reddy | AI/ML Engineer & Backend Developer",
  description: "Portfolio of M Karthikeya Reddy - AI/ML Engineer and Backend Developer specializing in Python, FastAPI, Machine Learning, and scalable backend systems.",
  keywords: ["AI Engineer", "ML Engineer", "Backend Developer", "Python", "FastAPI", "Machine Learning", "Deep Learning", "NLP"],
  authors: [{ name: "M Karthikeya Reddy" }],
  openGraph: {
    title: "M Karthikeya Reddy | AI/ML Engineer",
    description: "Portfolio showcasing AI/ML projects and backend development expertise",
    type: "website",
    siteName: "M Karthikeya Reddy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "M Karthikeya Reddy | AI/ML Engineer",
    description: "Portfolio showcasing AI/ML projects and backend development expertise",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
