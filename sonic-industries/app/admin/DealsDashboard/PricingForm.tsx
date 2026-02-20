import { DealFormDataType } from "@/types";
import { DollarSign } from "lucide-react";

interface PricingFormProps {
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
  dealType: "general" | "product" | "";
}

const PricingForm = ({ formData, setFormData, dealType }: PricingFormProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountPercent = () => {
    if (
      formData.mrp &&
      formData.discountedPrice &&
      formData.mrp > formData.discountedPrice
    ) {
      return Math.round(
        ((formData.mrp - formData.discountedPrice) / formData.mrp) * 100,
      );
    }
    return 0;
  };

  // 🧠 Update discountedPrice automatically if dealType is product
  const handleMrpChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      mrp: value,
      discountedPrice:
        dealType === "product"
          ? value - ((prev.discountPercent || 0) * value) / 100
          : prev.discountedPrice,
    }));
  };

  const handleDiscountPercentChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      discountPercent: value,
      discountedPrice:
        dealType === "product" && prev.mrp
          ? prev.mrp - (value * prev.mrp) / 100
          : prev.discountedPrice,
    }));
  };

  const handleDiscountedPriceChange = (value: number) => {
    if (dealType === "general") {
      setFormData((prev) => ({ ...prev, discountedPrice: value }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Pricing Details */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-blue-900">
            Pricing Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MRP */}
          {dealType === "product" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MRP (₹) *
                </label>
                <input
                  type="number"
                  value={formData.mrp || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled
                />
                {formData.mrp !== undefined && formData.mrp > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatPrice(formData.mrp)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percent (%)
                </label>
                <input
                  type="number"
                  value={formData.discountPercent || ""}
                  onChange={(e) =>
                    handleDiscountPercentChange(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. 10"
                  min="0"
                  required
                />
              </div>
            </>
          )}

          {/* Discounted Price / Final Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Final Price (₹) *
            </label>
            <input
              type="number"
              value={formData.discountedPrice || ""}
              onChange={(e) =>
                handleDiscountedPriceChange(parseFloat(e.target.value) || 0)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 1999"
              min="0"
              disabled={dealType === "product"} // 🧠 auto-calculated for products
              required
            />
            {formData.discountedPrice && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.discountedPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Discount Info */}
        {calculateDiscountPercent() > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium text-sm">
              🎉 Discount: {calculateDiscountPercent()}% OFF
            </p>
            <p className="text-green-700 text-sm mt-1">
              Your customer saves {formatPrice(formData.discountedPrice)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingForm;
