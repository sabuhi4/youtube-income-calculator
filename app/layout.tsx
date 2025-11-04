import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "YouTube Income Calculator",
  description: "Calculate potential YouTube earnings based on channel statistics",
  keywords: ["YouTube", "earnings calculator", "CPM", "monetization", "channel analytics"],
  authors: [{ name: "YouTube Income Calculator" }],
  openGraph: {
    title: "YouTube Income Calculator",
    description: "Calculate potential YouTube earnings based on channel statistics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}