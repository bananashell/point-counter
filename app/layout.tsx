import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "./contexts/QuizContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Quiz Tracker",
    description: "Track team scores in your quiz with neo-brutalist style",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
            >
                <QuizProvider>{children}</QuizProvider>
            </body>
        </html>
    );
}
