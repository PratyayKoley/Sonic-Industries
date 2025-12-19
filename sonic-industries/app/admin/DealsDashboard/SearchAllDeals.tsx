import { DealBackend, SearchAllDealProps } from "@/types";
import { Edit2, Trash2, Percent, Tag, Copy, Clock, Star, IndianRupee, Package } from "lucide-react";
import Image from "next/image";

const SearchAllDeals = ({
  deals,
  startEdit,
  handleDelete,
}: SearchAllDealProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = d.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: "Expired", color: "text-red-600 bg-red-50" };
    } else if (diffDays === 0) {
      return { text: "Expires today", color: "text-orange-600 bg-orange-50" };
    } else if (diffDays === 1) {
      return { text: "Expires tomorrow", color: "text-orange-600 bg-orange-50" };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days left`, color: "text-yellow-600 bg-yellow-50" };
    } else {
      return { text: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), color: "text-green-600 bg-green-50" };
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
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

  const getDealTypeBadge = (dealType: string) => {
    const types: Record<string, { color: string; icon: string }> = {
      'flash': { color: 'bg-red-500', icon: '⚡' },
      'clearance': { color: 'bg-orange-500', icon: '🏷️' },
      'seasonal': { color: 'bg-green-500', icon: '🎉' },
      'bundle': { color: 'bg-purple-500', icon: '📦' },
      'limited': { color: 'bg-blue-500', icon: '⏰' },
    };
    
    const type = types[dealType.toLowerCase()] || { color: 'bg-gray-500', icon: '🎯' };
    
    return (
      <span className={`${type.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
        <span>{type.icon}</span>
        {dealType}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center gap-2">
          <Percent className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Active Deals: <span className="text-orange-600">{deals.length}</span>
          </h2>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal: DealBackend) => {
          const expiryInfo = formatDate(deal.expiresAt);
          
          return (
            <div
              key={deal._id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-orange-300 transition-all group"
            >
              {/* Deal Image */}
              {deal.imageUrl && (
                <div className="relative h-40 bg-gradient-to-br from-orange-100 to-red-100">
                  <Image
                    src={deal.imageUrl}
                    alt={deal.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Discount Badge Overlay */}
                  {deal.discountPercent && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-lg shadow-lg">
                      {deal.discountPercent}% OFF
                    </div>
                  )}
                  {/* Deal Type Badge */}
                  <div className="absolute top-3 left-3">
                    {getDealTypeBadge(deal.dealType)}
                  </div>
                </div>
              )}

              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                  {deal.title}
                </h3>

                {/* Product Name */}
                {deal.productName && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Package className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{deal.productName}</span>
                  </div>
                )}

                {/* Description */}
                {deal.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {deal.description}
                  </p>
                )}

                {/* Rating */}
                {deal.rating && deal.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(deal.rating)}
                    </div>
                    <span className="text-xs text-gray-600">({deal.rating})</span>
                  </div>
                )}

                {/* Price Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-5 h-5 text-green-700" />
                      <span className="text-2xl font-bold text-green-700">
                        {formatPrice(deal.discountedPrice)}
                      </span>
                    </div>
                    {deal.mrp && (
                      <div className="text-right">
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(deal.mrp)}
                        </span>
                      </div>
                    )}
                  </div>
                  {deal.mrp && deal.discountedPrice && (
                    <div className="text-xs text-green-700 font-medium">
                      You save {formatPrice(deal.mrp - deal.discountedPrice)}
                    </div>
                  )}
                </div>

                {/* Coupon Code */}
                <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-700" />
                      <code className="font-mono font-bold text-amber-900 text-sm">
                        {deal.couponCode}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(deal.couponCode)}
                      className="text-amber-700 hover:text-amber-900 transition-colors"
                      title="Copy code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${expiryInfo.color}`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{expiryInfo.text}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => startEdit(deal)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-1 shadow-sm hover:shadow"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(deal._id)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex-1 shadow-sm hover:shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {deals.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Percent className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No Deals Available
          </h3>
          <p className="text-sm text-gray-500">
            Create your first deal to start offering discounts
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchAllDeals;