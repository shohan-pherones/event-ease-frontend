import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import type { Metadata } from "next";
import { MuseoModerno } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
    <ReactQueryClientProvider>
      <html lang="en" data-theme="sunset">
        <body className={cn(museoModerno.className, "antialiased")}>
          <ReduxStoreProvider>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                duration: 5000,
              }}
            />
            <Header />
            {children}
            <Footer />
          </ReduxStoreProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
