import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WedPlan — Plan Your Perfect Wedding",
  description:
    "Discover and book trusted wedding venues, photographers, planners, and more with WedPlan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Suspense fallback={<div className="h-16 sm:h-20" />}>
          <Navbar />
        </Suspense>
        {children}

        <Footer></Footer>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
