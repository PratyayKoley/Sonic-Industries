import { CategoryBackend, ProductFormDataType } from "@/types";
import { Plus, X } from "lucide-react";

interface BasicFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
  categories: CategoryBackend[];
}

const BasicForm = ({ formData, setFormData, categories }: BasicFormProps) => {
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNameChange = (name: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const addImage = () => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      images: prev.images?.filter((_, i: number) => i !== index) || [],
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      images: prev.images?.map((img: string, i: number) => (i === index ? value : img)) || [],
    }));
  };



  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug || ""}
            onChange={(e) =>
              setFormData((prev: typeof formData) => ({
                ...prev,
                slug: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="product-slug"
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated from name, but you can customize it
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category: CategoryBackend) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tagline
        </label>
        <input
          type="text"
          value={formData.tagline || ""}
          onChange={(e) =>
            setFormData((prev: typeof formData) => ({
              ...prev,
              tagline: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Short product tagline"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev: typeof formData) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Product description..."
        />
      </div>

      {/* Images Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>
        
        <div className="space-y-2">
          {formData.images?.map((image: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {(!formData.images || formData.images.length === 0) && (
            <div className="text-sm text-gray-500 py-2">
              No images added yet. Click &quot;Add Image&quot; to start.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicForm;