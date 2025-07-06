import { ProductFormDataType } from "@/types";
import { DollarSign, Package, Star } from "lucide-react";

interface PricingFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const PricingForm = ({ formData, setFormData }: PricingFormProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (formData.mrp && formData.price && formData.mrp > formData.price) {
      const discount = ((formData.mrp - formData.price) / formData.mrp) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">Pricing Information</h3>
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
            />
            {formData.price && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.price)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MRP (₹)
            </label>
            <input
              type="number"
              value={formData.mrp || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  mrp: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="0.01"
            />
            {formData.mrp && (
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(formData.mrp)}
              </p>
            )}
          </div>
        </div>

        {/* Discount Display */}
        {calculateDiscount() > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                Discount: {calculateDiscount()}% OFF
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Customer saves {formatPrice(formData.mrp - formData.price)}
            </p>
          </div>
        )}
      </div>

      {/* Stock Section */}
      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-medium text-orange-900">Stock Management</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity *
            </label>
            <input
              type="number"
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  stock: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="text"
              value={formData.sku || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  sku: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SKU-001"
            />
          </div>
        </div>

        {/* Stock Status */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              formData.stock > 10 ? 'bg-green-500' : 
              formData.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              formData.stock > 10 ? 'text-green-800' : 
              formData.stock > 0 ? 'text-yellow-800' : 'text-red-800'
            }`}>
              {formData.stock > 10 ? 'In Stock' : 
               formData.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-medium text-yellow-900">Customer Reviews</h3>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Reviews
            </label>
            <input
              type="number"
              value={formData.num_reviews || ""}
              onChange={(e) =>
                setFormData((prev: typeof formData) => ({
                  ...prev,
                  num_reviews: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
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
            <span className="text-sm text-gray-600">
              {formData.rating} out of 5 ({formData.num_reviews || 0} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Pricing Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Selling Price:</span>
            <span className="font-medium">{formData.price ? formatPrice(formData.price) : '₹0'}</span>
          </div>
          {formData.mrp && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">MRP:</span>
              <span className="line-through text-gray-500">{formatPrice(formData.mrp)}</span>
            </div>
          )}
          {calculateDiscount() > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-green-600">{calculateDiscount()}% OFF</span>
            </div>
          )}
          <div className="flex justify-between text-sm border-t pt-2">
            <span className="text-gray-600">Stock Status:</span>
            <span className={`font-medium ${
              formData.stock > 10 ? 'text-green-600' : 
              formData.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {formData.stock || 0} units
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;