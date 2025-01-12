import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { MuseoModerno } from "next/font/google";
import "./globals.css";

const museoModerno = MuseoModerno({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fantasy">
      <body className={cn(museoModerno.className, "antialiased")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
