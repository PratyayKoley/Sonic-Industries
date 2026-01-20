import { DealFormDataType, ProductBackend } from "@/types";

interface BasicFormProps {
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
  dealType: "general" | "product" | "";
  products: ProductBackend[];
}

const BasicForm = ({
  formData,
  setFormData,
  dealType,
  products,
}: BasicFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deal Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter deal title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {dealType === "product" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product *
          </label>
          <select
            value={formData.productName || ""}
            onChange={(e) => {
              const selectedProduct = products.find((p) => p.name === e.target.value);
              setFormData((prev) => ({
                ...prev,
                productName: e.target.value,
                mrp: selectedProduct?.price || 0,
              }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Enter deal description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deal Coupon Code
        </label>
        <input
          type="text"
          value={formData.couponCode}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, couponCode: e.target.value }))
          }
          placeholder="Enter deal coupon code"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default BasicForm;
