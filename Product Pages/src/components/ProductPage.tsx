// ProductPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SEO from "./SEO";
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

const ProductPage = () => {
  const { slug } = useParams();
  console.log(slug);
  const [productData, setProductData] = useState<CategoryBackend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${slug}`)
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
        <SEO title="Loading... | Sonic Industries" />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${productData.name} | Sonic Industries`}
        description={productData.description}
        canonical={`https://yourdomain.com/product/${slug}`}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: productData.name,
            description: productData.description,
            brand: {
              "@type": "Brand",
              name: "Sonic Industries",
            },
          })}
        </script>
      </SEO>
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
