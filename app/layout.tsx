import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cyril Handyman & Door LLC",
    template: "%s | Cyril Handyman & Door LLC",
  },
  description: "TODO_CONTENT — site description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
