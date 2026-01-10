"use client";

import { ProductBackend, ProductSearchBySlugProps } from "@/types";
import { Trash2, Edit2, Search, Star, DollarSign } from "lucide-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";

const SearchBySlug = ({
  loading,
  setLoading,
  setError,
  startEdit,
  handleDelete,
}: ProductSearchBySlugProps) => {
  const [searchSlug, setSearchSlug] = useState("");
  const [searchResults, setSearchResults] = useState<ProductBackend[]>([]);

  const handleSearch = async () => {
    if (!searchSlug.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${searchSlug}`
      );
      setSearchResults([response.data.product]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.status === 404) {
        setError("No product found with that slug.");
        setSearchResults([]);
      } else {
        setError(
          error.response?.data?.message || "Search failed. Please try again."
        );
        setSearchResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchSlug}
            onChange={(e) => setSearchSlug(e.target.value)}
            placeholder="Enter product slug to search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !searchSlug.trim()}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                {product.images && product.images.length > 0 && (
                  <div className="lg:w-48 lg:h-48 w-full h-48 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      width={500}
                      height={500}
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      {product.tagline && (
                        <p className="text-sm text-gray-600 mb-2">
                          {product.tagline}
                        </p>
                      )}
                      <p className="text-gray-600 mb-2">Slug: {product.slug}</p>
                    </div>

                    {/* Price and Rating */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-gray-700 mb-4">{product.description}</p>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {feature.name}
                            {feature.weight && ` (${feature.weight})`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Packaging Info */}
                  {product.packaging && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Packaging:
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {product.packaging.items && (
                          <p>Items: {product.packaging.items}</p>
                        )}
                        {product.packaging.length &&
                          product.packaging.width &&
                          product.packaging.height && (
                            <p>
                              Dimensions: {product.packaging.length} ×{" "}
                              {product.packaging.width} ×{" "}
                              {product.packaging.height}
                            </p>
                          )}
                      </div>
                    </div>
                  )}

                  {/* YouTube Video */}
                  {product.yt_video_url && (
                    <div className="mb-4">
                      <a
                        href={product.yt_video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a2.998 2.998 0 0 0-2.113-2.113C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.385.527A2.998 2.998 0 0 0 .502 6.186C0 8.066 0 12 0 12s0 3.934.502 5.814a2.998 2.998 0 0 0 2.113 2.113c1.88.527 9.385.527 9.385.527s7.505 0 9.385-.527a2.998 2.998 0 0 0 2.113-2.113C24 15.934 24 12 24 12s0-3.934-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        Watch Video
                      </a>
                    </div>
                  )}

                  {/* YouTube Video */}
                  {product.unboxing_yt_video_url && (
                    <div className="mb-4">
                      <a
                        href={product.unboxing_yt_video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a2.998 2.998 0 0 0-2.113-2.113C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.385.527A2.998 2.998 0 0 0 .502 6.186C0 8.066 0 12 0 12s0 3.934.502 5.814a2.998 2.998 0 0 0 2.113 2.113c1.88.527 9.385.527 9.385.527s7.505 0 9.385-.527a2.998 2.998 0 0 0 2.113-2.113C24 15.934 24 12 24 12s0-3.934-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        Watch Video
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => startEdit(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBySlug;
