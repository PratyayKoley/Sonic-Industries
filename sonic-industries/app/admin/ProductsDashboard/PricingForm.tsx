import { ProductFormDataType } from "@/types";
import { DollarSign, Star } from "lucide-react";

interface PricingFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const PricingForm = ({ formData, setFormData }: PricingFormProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">
            Pricing Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price * (₹)
            </label>
            <input
              type="number"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
            {formData.price && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.price)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-medium text-yellow-900">
            Customer Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Average Rating (0-5)
            </label>
            <input
              type="number"
              value={formData.rating || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  rating: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>

        {/* Rating Display */}
        {formData.rating > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(formData.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Pricing Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Selling Price:</span>
            <span className="font-medium">
              {formData.price ? formatPrice(formData.price) : "₹0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
