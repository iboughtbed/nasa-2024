import "~/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/components/providers";
// import { SiteFooter } from "@/components/site-footer";
import { cn } from "~/lib/utils";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster as Sonner } from "~/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://nasa-2024.vercel.app"),
  title: "Exosky AI",
  description: "Discover more about our universe",
};

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background font-sans antialiased",
            GeistSans.variable,
            GeistMono.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">{children}</div>
            <TailwindIndicator />
            <Sonner richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
