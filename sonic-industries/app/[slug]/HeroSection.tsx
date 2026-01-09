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

  const isCategoryPage = isCategory(productData);

  const displayTitle = isCategoryPage
    ? productData.title || "Untitled"
    : productData.tagline || "Untitled";

  const siblingProducts = !isCategoryPage
    ? allProductData.products.filter((item) => item.slug !== productData.slug)
    : allProductData.products;

  const heroImage = isCategoryPage
    ? allProductData.images?.[0] // category → any product image
    : productData.images?.[0]; // product → its own image

  return (
    <section className="w-full bg-white px-4 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-5">
            {displayTitle}
          </h1>

          <ul className="text-gray-700 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 list-disc list-inside space-y-2 mb-8">
            {productData.description}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-red-600 hover:bg-red-700 transition text-white font-medium px-6 sm:px-8 py-3 rounded-md uppercase text-sm sm:text-base">
              Buy Now
            </button>

            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 transition font-medium px-6 sm:px-8 py-3 rounded-md uppercase text-sm sm:text-base">
              Learn More
            </button>
          </div>

          {/* Sibling Products */}
          {(isCategoryPage || siblingProducts.length > 0) && (
            <div className="mt-10">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {siblingProducts.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center shrink-0 cursor-pointer"
                    onClick={() => router.push(item.slug)}
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <span
                        className="absolute inset-1 rounded-full border-4 bg-cover bg-top"
                        style={{
                          backgroundImage: `url('${item.images[0]}')`,
                        }}
                      />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm text-center w-24">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
            <Ripple
              mainCircleSize={260}
              numCircles={6}
              className="absolute inset-0"
            />

            <div className="relative z-10 flex items-center justify-center w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
