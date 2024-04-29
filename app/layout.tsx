import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Song",
  description: "An ai music website developed based on Next.js and Suno AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex-1 grid lg:grid-cols-5 xl:grid-cols-6 overflow-hidden">
                <Sidebar className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 xl:col-span-5 border-l overflow-y-auto">
                  {children}
                </div>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
          <Toaster richColors />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
