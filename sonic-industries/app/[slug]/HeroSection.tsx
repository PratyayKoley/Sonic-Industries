"use client";

import { CategoryBackend, CategoryImages, ProductBackend } from "@/types";
import { Ripple } from "../ui/ripple";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  productData: CategoryBackend | ProductBackend;
  allProductData: CategoryImages;
}

export default function HeroSection({
  productData,
  allProductData,
}: HeroSectionProps) {
  const router = useRouter();

  useEffect(() => {
    if (productData?.name) {
      document.title = `${productData.name} | Sonic Industries`;
    }
  }, [productData]);

  function isCategory(
    data: CategoryBackend | ProductBackend
  ): data is CategoryBackend {
    return "title" in data;
  }

  const displayTitle = isCategory(productData)
    ? productData.title || "Untitled"
    : productData.tagline || "Untitled";

  return (
    <section className="min-h-screen w-full bg-white px-4 py-12" id="home">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-8 xl:ml-20 mt-12 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {displayTitle}
          </h1>

          <ul className="text-gray-700 mb-8 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 list-disc list-inside space-y-2">
            {productData.description}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-medium px-8 py-3 rounded-md uppercase hover:tracking-widest cursor-pointer tracking-normal">
              Buy Now
            </button>

            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 font-medium px-8 py-3 rounded-md uppercase hover:tracking-widest cursor-pointer tracking-normal">
              Learn More
            </button>
          </div>
          <div className="container px-4 mt-10">
            <div>
              <div className="flex gap-4 flex-nowrap overflow-x-auto relative min-w-[calc(100%-5em)] mt-8 h-max scrollbar-hide">
                {allProductData.products.map((item) => (
                  <div
                    className="flex flex-col items-center flex-shrink-0"
                    key={item._id}
                    onClick={() => router.push(`${item.slug}`)}
                  >
                    {/* Bigger Circle */}
                    <div className="relative w-[150px] h-[150px] cursor-pointer before:content-[''] before:absolute before:inset-0 before:rounded-full">
                      {/* Bigger Inner Image */}
                      <span
                        className="absolute inset-[3px] rounded-full border-[4px]  z-[1] bg-cover bg-top"
                        style={{ backgroundImage: `url('${item.images[0]}')` }}
                      ></span>
                    </div>

                    <span className="w-[6em] text-center text-[0.8em] mt-1">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center relative md:mr-10">
          <div className="relative w-full h-[380px] sm:h-[420px] md:h-[480px] lg:h-[600px]">
            <Ripple
              mainCircleSize={300}
              numCircles={6}
              className="absolute inset-0 w-full h-full"
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="relative w-full h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allProductData.images[0]}
                  alt="Product"
                  height={500}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
