"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
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
import { CategoryBackend } from "@/types";
import Head from "next/head";

const ProductPage = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState<CategoryBackend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${slug}`)
      .then((res) => {
        setProductData(res.data.category);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [slug]);

  // Don't render anything until data is loaded
  if (loading || !productData) {
    return (
      <>
        <Head>
          <title>Loading... | Sonic Industries</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{productData.name} | Sonic Industries</title>
        <meta
          name="description"
          content={
            productData.description ||
            "Explore this product from Sonic Industries"
          }
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${slug}`} />

        {/* Optional: Structured Data for Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: productData.name,
              description: productData.description,
              brand: {
                "@type": "Brand",
                name: "Sonic Industries",
              },
            }),
          }}
        />
      </Head>
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
};

export default ProductPage;
