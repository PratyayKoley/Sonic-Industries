import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  title: {
    default: "Sonic Industries",
    template: "%s | Sonic Industries",
  },
  description:
    "Sonic Industries specializes in advanced packaging and coding machinery in India. Discover high-quality sealing, labeling, and vacuum packaging equipment.",
  keywords: [
    "packaging",
    "batch coding",
    "vacuum sealer",
    "industrial machinery",
    "sonic industries",
    "inkjet printer",
  ],
  authors: [
    { name: "Pratyay Koley", url: "https://github.com/PratyayKoley" },
    { name: "Kunal Barot", url: "" },
  ],
  openGraph: {
    title: "Sonic Industries",
    description:
      "Sonic Industries - India's leading provider of packaging and coding machinery. Browse our product range including band sealers, vacuum packaging, and more.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    type: "website",
    siteName: "Sonic Industries",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Sonic Industries Product Showcase",
      },
    ],
  },
  twitter: {
    title: "Sonic Industries",
    description:
      "Sonic Industries - India's leading provider of packaging and coding machinery. Browse our product range including band sealers, vacuum packaging, and more.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Sonic Industries Product Showcase",
      },
    ],
    card: "summary_large_image",
    creator: "Kunal Barot",
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
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
