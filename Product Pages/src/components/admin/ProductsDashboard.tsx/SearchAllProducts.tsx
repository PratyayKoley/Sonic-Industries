import { ProductBackend, CategoryBackend, SearchAllProductProps } from "@/types";
import { Edit2, Trash2, Star, Package, IndianRupee } from "lucide-react";

const SearchAllProducts = ({
  products,
  categories,
  startEdit,
  handleDelete,
}: SearchAllProductProps) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: CategoryBackend) => cat._id === categoryId);
    return category?.name || "Unknown Category";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
        <Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product: ProductBackend) => (
        <div
          key={product._id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          {product.images && product.images.length > 0 && (
            <div className="mb-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md bg-gray-100"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
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
              <p className="text-sm text-gray-600 italic">{product.tagline}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {getCategoryName(product.categoryId)}
              </span>
              <span>•</span>
              <span>Slug: {product.slug}</span>
            </div>

            {/* Price and Stock */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Rating */}
            {product.rating && product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.num_reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-700 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Product Details */}
            <div className="flex flex-wrap gap-2 text-xs">
              {product.size && (
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  Size: {product.size}
                </span>
              )}
              {product.color && (
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  Color: {product.color}
                </span>
              )}
              {product.material && (
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  Material: {product.material}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => startEdit(product)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchAllProducts;