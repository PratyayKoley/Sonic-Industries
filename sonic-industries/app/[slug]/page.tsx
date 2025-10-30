import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import About from "./About";
import Features from "./ProductIntro";
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
import { CategoryBackend, CategoryImages } from "@/types";
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
        { next: { revalidate: 3600 } }
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

const getAllProductsUnderCategory = cache(
  async (id: string | undefined): Promise<CategoryImages> => {
    if (!id) return { products: [], images: [] };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}/images`,
        { next: { revalidate: 3600 } }
      );

      if (!res.ok) return { products: [], images: [] };
      const data = await res.json();
      return {
        products: Array.isArray(data.products) ? data.products : [],
        images: Array.isArray(data.images) ? data.images : [],
      };
    } catch (error) {
      console.error("Error fetching products under category:", error);
      return { products: [], images: [] };
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
  const { slug } = await params; // 👈 MUST await?
  const productData: CategoryBackend | null = await getProduct(slug);
  const allProductData = await getAllProductsUnderCategory(productData?._id);

  if (!productData) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <HeroSection productData={productData} allProductData={allProductData} />

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
      <Features productData={productData} allProductData={allProductData} />
      <Hotspots productData={productData} allProductData={allProductData} />
      <DealsOfWeek />
      <ProductVariants productData={productData} />
      <WhyChooseUs productData={productData} />
      <ProductComparison />
      <Testimonials />
      <FAQs />
      <ContactUs />
      <Footer />
    </>
  );
}
