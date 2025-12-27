import { ProductBackend, SearchAllProductProps } from "@/types";
import {
  Edit2,
  Trash2,
  Star,
  IndianRupee,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
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
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-3 h-3 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  // Group products by category
  const groupedProducts = categories
    .map((category) => ({
      category,
      products: products.filter(
        (product) => product.categoryId._id === category._id
      ),
    }))
    .filter((group) => group.products.length > 0);

  // Products with no matching category
  const uncategorizedProducts = products.filter(
    (product) => !categories.find((cat) => cat._id === product.categoryId._id)
  );

  return (
    <div className="space-y-6">
      {groupedProducts.map(({ category, products: categoryProducts }) => (
        <div
          key={category._id}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white"
        >
          {/* Category Header */}
          <button
            onClick={() => toggleCategory(category._id)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">
                {category.name}
              </h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {categoryProducts.length}{" "}
                {categoryProducts.length === 1 ? "Product" : "Products"}
              </span>
            </div>
            {expandedCategories.has(category._id) ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Products Grid */}
          {expandedCategories.has(category._id) && (
            <div className="p-4 bg-gray-50">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product: ProductBackend) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300 cursor-pointer"
                  >
                    {/* Product Image */}
                    {product.images && product.images.length > 0 && (
                      <div className="mb-3">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={500}
                          height={500}
                          className="w-full h-32 object-cover rounded-md bg-gray-100"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {product.name}
                      </h3>

                      {product.tagline && (
                        <p className="text-sm text-gray-600 italic">
                          {product.tagline}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Slug: {product.slug}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600 text-lg">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      {/* Rating */}
                      {product.rating && product.rating > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-xs text-gray-600">
                            ({product.rating})
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      {product.description && (
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => startEdit(product)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex-1 justify-center cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex-1 justify-center cursor-pointer"
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

      {/* Uncategorized Products */}
      {uncategorizedProducts.length > 0 && (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="p-4 bg-linear-to-r from-gray-50 to-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">Uncategorized</h2>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {uncategorizedProducts.length}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {uncategorizedProducts.map((product: ProductBackend) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all"
                >
                  {/* Same product card structure as above */}
                  {product.images && product.images.length > 0 && (
                    <div className="mb-3">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-32 object-cover rounded-md bg-gray-100"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {product.name}
                    </h3>
                    {product.tagline && (
                      <p className="text-sm text-gray-600 italic">
                        {product.tagline}
                      </p>
                    )}
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-600 text-lg">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <button
                      onClick={() => startEdit(product)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex-1 justify-center"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex-1 justify-center"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {groupedProducts.length === 0 && uncategorizedProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default SearchAllProducts;
