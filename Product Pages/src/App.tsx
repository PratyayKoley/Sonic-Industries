import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AttractiveFeatures from "./components/AttractiveFeatures";
import Comparison from "./components/Comparison";
import ContactUs from "./components/ContactUs";
import Deals_Video from "./components/Deals_Video";
import FAQs from "./components/FAQs";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import IndustryFeatures from "./components/IndustryFeatures";
import Navbar from "./components/NavBar";
import About from "./components/About";
import ProductIntro from "./components/ProductIntro";
import Related_Products from "./components/Related_Products";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/Why_Choose_Us";

const App = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}`, {
        params: { prod_id: id },
      })
      .then((res) => {
        console.log("Product Data: ", res.data);
        setProductData(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!productData) return <div>Loading...</div>;

  return (
    <>
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

export default App;
