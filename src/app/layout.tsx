import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  display: "swap",
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Minimal portfolio@theBappy",
  description: "Created with nextjs,react, tailwindcss and framer-motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#283127] text-stone-900 antialiased ${archivo.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
