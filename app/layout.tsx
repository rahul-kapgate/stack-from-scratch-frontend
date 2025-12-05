import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ReactQueryProvider } from "./providers";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Stack From Scratch",
  description: "My Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <Header />
              <main className="mx-auto flex-1 max-w-5xl px-4 py-6">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
