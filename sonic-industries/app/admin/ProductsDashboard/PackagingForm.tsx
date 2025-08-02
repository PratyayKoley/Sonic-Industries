import React from "react";
import { Package } from "lucide-react";
import { ProductFormDataType, ProductPackaged } from "@/types";

interface PackagingFormProps {
  formData: ProductFormDataType
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const PackagingForm = ({ formData, setFormData }: PackagingFormProps) => {
  const handleChange = (field: keyof ProductPackaged, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setFormData((prev: ProductFormDataType) => ({
      ...prev,
      packaging: {
        ...prev.packaging,
        [field]: numericValue,
      },
    }));
  };

  const packaging = formData.packaging || {
    items: 0,
    length: 0,
    width: 0,
    height: 0,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">
          Packaging Information
        </h3>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Length (cm)
            </label>
            <input
              type="number"
              value={packaging.length}
              onChange={(e) => handleChange("length", e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (cm)
            </label>
            <input
              type="number"
              value={packaging.width}
              onChange={(e) => handleChange("width", e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={packaging.height}
              onChange={(e) => handleChange("height", e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Package Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Package Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Dimensions:</span>
              <span className="ml-1">
                {packaging.length && packaging.width && packaging.height
                  ? `${packaging.length} × ${packaging.width} × ${packaging.height} cm`
                  : "Not specified"}
              </span>
            </div>
          </div>
          {packaging.length && packaging.width && packaging.height && (
            <div className="mt-2 text-sm">
              <span className="font-medium text-gray-700">Volume:</span>
              <span className="ml-1">
                {(
                  packaging.length *
                  packaging.width *
                  packaging.height
                ).toFixed(2)}{" "}
                cm³
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagingForm;
