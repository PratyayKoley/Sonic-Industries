import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import About from "./About";
import Features from "./ProductIntro";
import PackagingInfo from "./PackagingInfo";
import Hotspots from "./Hotspots";
import DealsOfWeek from "./DealsOfWeek";
import ProductVariants from "./ProductVariants";
import WhyChooseUs from "./WhyChooseUs";
import ProductComparison from "./ProductComparison";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import type { Metadata } from "next";
import { CategoryBackend } from "@/types";
import { notFound } from "next/navigation";
import { cache } from "react";
import Script from "next/script";

type Props = {
  params: Promise<{ slug: string }>;
};

// Fetch product data (server-side)
const getProduct = cache(
  async (slug: string): Promise<CategoryBackend | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${slug}`,
        { cache: "no-store" }
      );

      if (!res.ok) return null;
      const data = await res.json();
      return data.category;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }
);

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();

    return data.categories.map((cat: CategoryBackend) => ({
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

// ✅ Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: product ? `${product.name}` : "Sonic Industries",
    description:
      product?.description ||
      "Explore high-quality packaging and coding machinery from Sonic Industries.",
    keywords: [],
    openGraph: {
      title: product?.name || "Sonic Industries",
      description:
        product?.description ||
        "Explore high-quality packaging and coding machinery from Sonic Industries.",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${slug}`,
      type: "website",
      siteName: "Sonic Industries",
      images: [
        {
          url: `link to opengraph image url`,
          width: 1200,
          height: 630,
          alt: "Sonic Industries Product Showcase",
        },
      ],
    },
    twitter: {
      title: product ? `${product.name}` : "Sonic Industries",
      description:
        product?.description ||
        "Explore high-quality packaging and coding machinery from Sonic Industries.",
      images: [
        {
          url: `link to opengraph image url`,
          width: 1200,
          height: 630,
          alt: "Sonic Industries Product Showcase",
        },
      ],
      card: "summary_large_image",
      creator: "Kunal Barot",
    },
  };
}

// ✅ Page itself
export default async function ProductPage({ params }: Props) {
  const { slug } = await params; // 👈 MUST await
  const productData = await getProduct(slug);

  if (!productData) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <HeroSection productData={productData} />

      {/* script ld json */}
      <Script id="ld-json-category" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: productData.name,
          description: productData.description,
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${productData.slug}`,
        })}
      </Script>

      {/* Breadcrumbs */}
      <Script id="ld-json-breadcrumb" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: productData.name,
              item: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${productData.slug}`,
            },
          ],
        })}
      </Script>

      <About />
      <Features productData={productData} />
      <PackagingInfo productData={productData} />
      <Hotspots />
      <DealsOfWeek />
      <ProductVariants />
      <WhyChooseUs productData={productData} />
      <ProductComparison />
      <Testimonials />
      <FAQs />
      <ContactUs />
      <Footer />
    </>
  );
}
