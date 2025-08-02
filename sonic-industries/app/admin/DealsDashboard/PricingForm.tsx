import { DealFormDataType } from "@/types";
import { DollarSign } from "lucide-react";

interface PricingFormProps {
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
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

  const calculateDiscount = () => {
    const { mrp, discountedPrice } = formData;

    if (mrp && discountedPrice && mrp > discountedPrice) {
      const discount = ((mrp - discountedPrice) / mrp) * 100;
      return Math.round(100 - discount); 
    }

    return 0;
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MRP (₹) *
            </label>
            <input
              type="number"
              value={formData.mrp || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mrp: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 2500"
              min="0"
            />
            {formData.mrp && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.mrp)}
              </p>
            )}
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discounted Price (₹) *
            </label>
            <input
              type="number"
              value={formData.discountedPrice || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discountedPrice: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 1999"
              min="0"
            />
            {formData.discountedPrice && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.discountedPrice)}
              </p>
            )}
          </div>

          {/* Original Purchase Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price (Your Buy Price)
            </label>
            <input
              type="number"
              value={formData.mrp - formData.discountedPrice || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mrp: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 1500"
              min="0"
            />
            {formData.mrp && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.mrp)}
              </p>
            )}
          </div>
        </div>

        {/* Discount Info */}
        {calculateDiscount() > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium text-sm">
              🎉 Discount: {calculateDiscount()}% OFF
            </p>
            <p className="text-green-700 text-sm mt-1">
              Your customer saves{" "}
              {formatPrice(formData.discountedPrice)}
            </p>
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">MRP:</span>
            <span className="line-through text-gray-500">
              {formData.mrp ? formatPrice(formData.mrp) : "₹0"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Selling Price:</span>
            <span className="text-blue-700 font-medium">
              {formData.discountedPrice
                ? formatPrice(formData.discountedPrice)
                : "₹0"}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            {calculateDiscount() > 0 && (
              <>
                <span className="text-gray-700">Discount:</span>
                <span className="text-green-600 font-medium">
                  {calculateDiscount()}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
