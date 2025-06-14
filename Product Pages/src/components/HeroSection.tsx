import { Ripple } from "./ui/ripple";
import { useEffect } from "react";

export default function HeroSection({ productData }) {
  console.log(productData);

  useEffect(() => {
    if (productData?.name) {
      document.title = `${productData.name} | Sonic Industries`;
    }
  }, [productData]);
  
  return (
    <section
      className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12"
      id="home"
    >
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-8 xl:ml-20 mt-12 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {productData.name}
          </h1>

          <ul className="text-gray-700 mb-8 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 list-disc list-inside space-y-2">
            {/* {productData.bullet_points.split("\n,").map((point, index) => (
              <li key={index}>{point.replace(/^["\s]*|["\s]*$/g, "")}</li>
            ))} */}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-medium px-8 py-3 rounded-md uppercase hover:tracking-widest cursor-pointer tracking-normal">
              Buy Now
            </button>

            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 font-medium px-8 py-3 rounded-md uppercase hover:tracking-widest cursor-pointer tracking-normal">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image & Ripple */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative md:mr-10">
          <div className="relative w-screen h-screen md:h-[600px] lg:h-screen lg:w-full">
            <Ripple
              mainCircleSize={400}
              numCircles={6}
              className="absolute inset-0 w-full h-full"
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              {/* <img
                // src={}
                alt="Digital smartwatch showing text conversation"
                className="h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 w-auto object-contain"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
