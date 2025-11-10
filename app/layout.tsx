import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const bai_Jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tag-It",
  description:
    " Your web, your rules. Master your links with style and smarts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${bai_Jamjuree.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="relative">
              <Toaster />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
  );
}
