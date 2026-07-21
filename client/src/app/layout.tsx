import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { SocketProvider } from "@/socket/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const logoFont = Luckiest_Guy({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Skribble",
  description: "Online Multiplayer Drawing & Guessing Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${logoFont.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-screen font-sans bg-background text-text">
        <Providers>
          <SocketProvider>
            <Navbar />
            {children}
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
