"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit2,
  Trash2,
  Star,
  IndianRupee,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { ProductBackend, SearchAllProductProps } from "@/types";

const SearchAllProducts = ({
  products,
  categories,
  startEdit,
  handleDelete,
}: SearchAllProductProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
      return next;
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }
    for (let i = 0; i < 5 - Math.ceil(rating); i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }
    return stars;
  };

  /* ---------- GROUP PRODUCTS ---------- */

  const groupedProducts = categories
    .map((category) => ({
      category,
      products: products.filter(
        (p) => p.categoryId && p.categoryId._id === category._id
      ),
    }))
    .filter((group) => group.products.length > 0);

  const uncategorizedProducts = products.filter(
    (p) => !categories.find((c) => c._id === p.categoryId?._id)
  );

  /* ---------- UI ---------- */

  return (
    <div className="space-y-4">
      {groupedProducts.map(({ category, products }) => (
        <div
          key={category._id}
          className="border rounded-md bg-white overflow-hidden"
        >
          {/* CATEGORY HEADER */}
          <button
            onClick={() => toggleCategory(category._id)}
            className="w-full flex items-center justify-between px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-800">
                {category.name}
              </h2>
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-600 text-white font-medium">
                {products.length}
              </span>
            </div>

            {expandedCategories.has(category._id) ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* PRODUCTS */}
          {expandedCategories.has(category._id) && (
            <div className="p-3 bg-gray-50">
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border rounded-md p-3 hover:shadow transition"
                  >
                    {/* IMAGE */}
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={200}
                        className="w-full h-24 object-cover rounded bg-gray-100 mb-2"
                      />
                    )}

                    {/* NAME */}
                    <h3 className="text-sm font-medium text-gray-900 leading-tight">
                      {product.name}
                    </h3>

                    {/* TAGLINE */}
                    {product.tagline && (
                      <p className="text-xs text-gray-600 italic leading-snug">
                        {product.tagline}
                      </p>
                    )}

                    {/* SLUG */}
                    <p className="text-[11px] text-gray-500 mt-1 truncate">
                      Slug: <span className="font-mono">{product.slug}</span>
                    </p>

                    {/* LINK */}
                    <Link
                      href={`/${product.slug}`}
                      target="_blank"
                      className="block text-[11px] text-blue-600 truncate"
                    >
                      {process.env.NEXT_PUBLIC_FRONTEND_URL}/{product.slug}
                    </Link>

                    {/* PRICE */}
                    <div className="flex items-center gap-1 mt-1">
                      <IndianRupee className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* RATING */}
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(product.rating)}
                        <span className="text-[11px] text-gray-500">
                          ({product.rating})
                        </span>
                      </div>
                    )}

                    {/* DESCRIPTION */}
                    {product.description && (
                      <p className="text-xs text-gray-700 mt-1 line-clamp-2 leading-snug">
                        {product.description}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-2 mt-3 pt-2 border-t">
                      <button
                        onClick={() => startEdit(product)}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-1 rounded text-xs hover:bg-blue-700 transition cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white py-1 rounded text-xs hover:bg-red-700 transition cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* UNCATEGORIZED */}
      {uncategorizedProducts.length > 0 && (
        <div className="border rounded-md bg-white p-3">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Uncategorized ({uncategorizedProducts.length})
          </h2>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {uncategorizedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-md p-3"
              >
                <h3 className="text-sm font-medium">{product.name}</h3>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(product)}
                    className="flex-1 bg-blue-600 text-white py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-600 text-white py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-10 text-sm text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
};

export default SearchAllProducts;