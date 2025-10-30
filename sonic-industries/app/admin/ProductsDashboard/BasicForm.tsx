import { CategoryBackend, ProductFormDataType, ProductImage } from "@/types";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface BasicFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
  categories: CategoryBackend[];
}

const BasicForm = ({ formData, setFormData, categories }: BasicFormProps) => {
  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  // track created objectURLs so we can revoke them
  const createdObjectUrls = useRef<Set<string>>(new Set());

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileItems: ProductImage[] = Array.from(files).map((file) => {
      const preview = URL.createObjectURL(file);
      createdObjectUrls.current.add(preview);
      return { file, preview, isNew: true };
    });

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...fileItems],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const next = prev.images?.filter((_, i) => i !== index) || [];
      return { ...prev, images: next };
    });
  };

  const cancelAllImages = () => {
    // revoke all created object URLs for new images
    createdObjectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    createdObjectUrls.current.clear();

    setFormData((prev) => ({ ...prev, images: [] }));
  };

  // revoke object URLs when component unmounts or when images change (cleanup)
  useEffect(() => {
    const urls = createdObjectUrls.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      urls.clear();
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Name + Slug */}
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
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="product-slug"
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated from name, but you can customize it
          </p>
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
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

      {/* Tagline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tagline
        </label>
        <input
          type="text"
          value={formData.tagline || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tagline: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Short product tagline"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Product description..."
        />
      </div>

      {/* Images Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>

          <div className="flex items-center gap-3">
            {formData.images && formData.images.length > 0 && (
              <button
                type="button"
                onClick={cancelAllImages}
                className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel All
              </button>
            )}

            <label className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Image Previews */}
        {formData.images && formData.images.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {formData.images.map((img, index) => {
              // if img is string -> existing Cloudinary URL
              if (typeof img === "string") {
                return (
                  <div
                    key={index}
                    className="relative w-32 h-32 border rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white/80 text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              // else it's a NewImageItem
              const preview = img.preview;
              return (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden"
                >
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // revoke this object's URL before removing
                      try {
                        if (img.isNew) URL.revokeObjectURL(preview);
                        createdObjectUrls.current.delete(preview);
                      } catch {}
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-white/80 text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-2">
            No images uploaded yet. Click &quot;Upload Images&quot; to add.
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicForm;
