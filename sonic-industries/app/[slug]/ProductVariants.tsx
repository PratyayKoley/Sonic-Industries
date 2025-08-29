"use client"

import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/ui/carousel';
import Image from 'next/image';

export default function ProductVariants() {
    const products = [
        { id: 1, name: "Prolab Blue", price: 135, oldPrice: 193, image: "/smartwatch.png", rating: 4.5, background: "bg-pink-200" },
        { id: 2, name: "Prolab Blue", price: 135, oldPrice: 193, image: "/smartwatch2.png", rating: 4.5, background: "bg-gray-500" },
        { id: 3, name: "Prolab Blue", price: 135, oldPrice: 193, image: "/smartwatch3.png", rating: 4.5, background: "bg-pink-200" },
        { id: 4, name: "Prolab Blue", price: 135, oldPrice: 193, image: "/smartwatch4.png", rating: 4.5, background: "bg-black" },
        { id: 5, name: "Prolab Grey", price: 135, oldPrice: 193, image: "/smartwatch.png", rating: 4.5, background: "bg-pink-200" },
        { id: 6, name: "Prolab White", price: 135, oldPrice: 193, image: "/smartwatch2.png", rating: 4.5, background: "bg-blue-200" },
    ];

    // Helper function to render stars
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="text-green-500 fill-green-500" size={20} />);
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
                stars.push(<Star key={i} className="text-gray-300 fill-gray-300" size={20} />);
            }
        }

        return stars;
    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-4 py-8" id="products">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Our Awesome Products
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Prepared is me marianne pleasure likewise debating. Wonder an unable except better stairs
                        do ye admire. His secure called esteem praise.
                    </p>
                </div>

                {/* Products Carousel */}
                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                <div className="relative group overflow-hidden cursor-pointer">
                                    {/* Product Image with Background */}
                                    <div className={`${product.background} p-4 rounded-t-lg relative overflow-hidden h-64 flex items-center justify-center`}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            className="mx-auto transition-transform duration-300 group-hover:scale-105 z-10"
                                            width={500}
                                            height={500}
                                        />

                                        <div className="absolute group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                            <button className="py-3 px-8 bg-red-600 text-white font-bold text-lg rounded hover:bg-red-700 transform scale-0 group-hover:scale-100 transition-transform duration-300 cursor-pointer">
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
                                            <span className="text-xl font-bold text-indigo-600 mr-2">${product.price}</span>
                                            <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
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