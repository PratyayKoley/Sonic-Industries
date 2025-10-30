"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/carousel";
import Image from "next/image";
import { CategoryBackend, ProductBackend } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProductVariantsProps {
  productData: CategoryBackend;
}

export default function ProductVariants({ productData }: ProductVariantsProps) {
  const [products, setProducts] = useState<ProductBackend[]>([]);
  const router = useRouter();

  const handleBuyNow = async ({ productId }: { productId: string }) => {
    try {
      const SessionTokenRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/checkout`,
        { productId }
      );

      const { checkoutSessionToken } = SessionTokenRes.data;
      router.push(`/checkout?token=${checkoutSessionToken}`);
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/getProducts`,
          {
            categoryId: productData._id,
          }
        );
        setProducts(products.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [productData._id]);

  const backgroundColors = [
    "bg-pink-200",
    "bg-gray-500",
    "bg-black",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
  ];

  const getRandomBackground = () => {
    return backgroundColors[
      Math.floor(Math.random() * backgroundColors.length)
    ];
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="text-green-500 fill-green-500" size={20} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-gray-300 fill-gray-300" size={20} />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="text-green-500 fill-green-500" size={20} />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="text-gray-300 fill-gray-300" size={20} />
        );
      }
    }

    return stars;
  };

  return (
    <div
      className="bg-white min-h-screen flex items-center justify-center px-4 py-8"
      id="products"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Awesome Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepared is me marianne pleasure likewise debating. Wonder an unable
            except better stairs do ye admire. His secure called esteem praise.
          </p>
        </div>

        {/* Products Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <div className="relative group overflow-hidden cursor-pointer">
                  {/* Product Image with Background */}
                  <div
                    className={`${getRandomBackground()} p-4 rounded-t-lg relative overflow-hidden h-64 flex items-center justify-center`}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="mx-auto transition-transform duration-300 group-hover:scale-105 z-10"
                      width={500}
                      height={500}
                    />

                    <div className="absolute group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <button
                        className="py-3 px-8 bg-red-600 text-white font-bold text-lg rounded hover:bg-red-700 transform scale-0 group-hover:scale-100 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleBuyNow({ productId: product._id })}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="bg-gray-100 p-4 rounded-b-lg">
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-2">
                      <span className="text-xl font-bold text-indigo-600 mr-2">
                        ₹{product.price}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="static transform-none mx-2 cursor-pointer" />
            <CarouselNext className="static transform-none mx-2 cursor-pointer" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
