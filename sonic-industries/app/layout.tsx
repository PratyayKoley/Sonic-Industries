import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "./ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,
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
        <Toaster position="top-center" theme="light" richColors />

        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KKGC4KM9G1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KKGC4KM9G1');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '2559273667910769');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
