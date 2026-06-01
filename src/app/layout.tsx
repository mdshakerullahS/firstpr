import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/provider";
import Header from "@/components/header/index";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const TITLE = "FirstPR";
const DESCRIPTION =
  "An open-source issue matcher that helps developers find relevant GitHub issues to contribute to.";
const NAME = "Md Shakerullah Sourov";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@mdshakerullahS",
    images: ["/og-image.png"],
    description: DESCRIPTION,
    title: TITLE,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  creator: NAME,

  publisher: NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
