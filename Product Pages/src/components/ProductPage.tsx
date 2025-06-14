// ProductPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SEO from "./SEO";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import About from "./About";
import ProductIntro from "./ProductIntro";
import IndustryFeatures from "./IndustryFeatures";
import AttractiveFeatures from "./AttractiveFeatures";
import Deals_Video from "./Deals_Video";
import Related_Products from "./Related_Products";
import WhyChooseUs from "./Why_Choose_Us";
import Comparison from "./Comparison";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const ProductPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}`, {
        params: { prod_id: id },
      })
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

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
        canonical={`https://yourdomain.com/product/${id}`}
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
      <ProductIntro productData={productData} />
      <IndustryFeatures />
      <AttractiveFeatures />
      <Deals_Video />
      <Related_Products />
      <WhyChooseUs />
      <Comparison />
      <Testimonials />
      <FAQs />
      <ContactUs />
      <Footer />
    </>
  );
};

export default ProductPage;
