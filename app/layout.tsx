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
  metadataBase: new URL("https://dawah.deebpsace.com"), // change to your domain
  title: "القرآن الكريم بصوت الشيخ أحمد سعيد نصر",
  description:
    "استمع إلى القرآن الكريم كاملًا بصوت الشيخ أحمد سعيد نصر - رواية حفص عن عاصم.",
  openGraph: {
    type: "website",
    title: "القرآن الكريم - الشيخ أحمد سعيد نصر",
    description: "تلاوات قرآنية بصوت الشيخ أحمد سعيد نصر.",
    images: ["/images/cover.png"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
