import { ProductFormDataType } from "@/types";

interface DetailsFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const DetailsForm = ({ formData, setFormData }: DetailsFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU
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
            placeholder="SKU-123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <input
            type="text"
            value={formData.size || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                size: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Size (e.g., M, L, XL)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="text"
            value={formData.color || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                color: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Color"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <input
            type="text"
            value={formData.material || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                material: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Material"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country of Origin
          </label>
          <input
            type="text"
            value={formData.countryOfOrigin || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                countryOfOrigin: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HSN Code
          </label>
          <input
            type="text"
            value={formData.hsnCode || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                hsnCode: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="HSN Code"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;