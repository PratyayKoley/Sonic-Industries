import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Add all weights you need
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  title: {
    default: "Sonic Industries",
    template: "%s | Sonic Industries",
  },
  description: "Sonic Industries specializes in advanced packaging and coding machinery in India. Discover high-quality sealing, labeling, and vacuum packaging equipment.",
  keywords: ["packaging", "batch coding", "vacuum sealer", "industrial machinery", "sonic industries", "inkjet printer"],
  openGraph: {
    title: "Sonic Industries",
    description: "Sonic Industries - India's leading provider of packaging and coding machinery. Browse our product range including band sealers, vacuum packaging, and more.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    type: "website",
    siteName: "Sonic Industries",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/favicon.ico`,
        width: 1200,
        height: 630,
        alt: "Sonic Industries Product Showcase",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Only keep non-font related links here */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
      </head>
      <body className={`${poppins.variable} ${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
