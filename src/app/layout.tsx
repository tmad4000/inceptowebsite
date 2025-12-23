import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Incepto | Bento",
  description: "Live in the future, then build what’s missing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
