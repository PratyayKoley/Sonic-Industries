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

type Props = {
  params: Promise<{ slug: string }>;
};

// Fetch product data (server-side)
async function getProduct(slug: string): Promise<CategoryBackend | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${slug}`,
      { cache: "no-store" } // ensure fresh data
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.category;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      { cache: "no-store" }
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
    title: product ? `${product.name} | Sonic Industries` : "Sonic Industries",
    description:
      product?.description ||
      "Explore high-quality packaging and coding machinery from Sonic Industries.",
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
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Sonic Industries Product Showcase",
        },
      ],
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
