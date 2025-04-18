import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umovin | Personalized Fitness Plans",
  description: "Generate personalized exercise programs and add them to your calendar.",
};

function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-primary text-white rounded-b-2xl shadow-md">
      <span className="text-2xl font-extrabold tracking-tight">Umovin</span>
      <span className="text-sm font-semibold text-accent">Duolingo-inspired MVP</span>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
      >
        <Header />
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
