"use client";

import { Save, Plus, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ProductBackend, ProductEditingModalProps } from "@/types";
import { useState } from "react";

/**
 * Editing modal expects formData.images be hybrid:
 * - existing urls => string
 * - new => { file: File, preview: string, isNew: true }
 */

const EditingModal = ({
  selectedProduct,
  setSelectedProduct,
  formData,
  setFormData,
  loading,
  setLoading,
  setError,
  setSuccess,
  setIsEditing,
  products,
  setProducts,
}: ProductEditingModalProps) => {
  const [activeTab, setActiveTab] = useState<
    "basic" | "details" | "features" | "packaging"
  >("basic");

  const handleUpdate = async () => {
    if (!selectedProduct || !formData.name.trim() || !formData.slug.trim()) {
      setError("Name and slug are required");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      // Build FormData because we might have new files
      const payload = new FormData();
      payload.append("originalSlug", selectedProduct.slug); // your backend expects this (per your earlier code)
      payload.append("name", formData.name);
      payload.append("slug", formData.slug);
      if (formData.description)
        payload.append("description", formData.description);
      if (formData.tagline) payload.append("tagline", formData.tagline);
      payload.append("price", String(formData.price));
      payload.append("rating", String(formData.rating || 0));
      payload.append("features", JSON.stringify(formData.features || []));
      payload.append("packaging", JSON.stringify(formData.packaging || {}));
      if (formData.yt_video_url)
        payload.append("yt_video_url", formData.yt_video_url);

      const existingImageUrls: string[] = [];

      (formData.images || []).forEach((img) => {
        if (typeof img === "string") {
          existingImageUrls.push(img);
        } else if (img.file instanceof File) {
          payload.append("images", img.file);
        }
      });

      // send existing ones as a JSON string so backend can keep them
      payload.append("existingImages", JSON.stringify(existingImageUrls));

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        { payload: payload, slug: formData.slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        products.map((prod: ProductBackend) =>
          prod._id === selectedProduct._id ? response.data.updatedProduct : prod
        )
      );
      setSuccess("Product updated successfully!");
      setIsEditing(false);
      setSelectedProduct(response.data.updatedProduct);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      features: [...(prev.features || []), { name: "", weight: 0 }],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateFeature = (
    index: number,
    field: "name" | "weight",
    value: string | number
  ) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      features:
        prev.features?.map((feature, i) =>
          i === index ? { ...feature, [field]: value } : feature
        ) || [],
    }));
  };

  // Images editing helpers (works with hybrid images)
  const addImage = () => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      images: [
        ...(prev.images || []),
        { file: null, preview: "", isNew: true },
      ],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateImage = (index: number, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      images:
        prev.images?.map((img, i) => {
          if (i !== index) return img;

          if (value instanceof File) {
            const preview = URL.createObjectURL(value);
            return { file: value, preview, isNew: true };
          } else {
            // string URL
            return { file: null, preview: value, isNew: false };
          }
        }) || [],
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "packaging", label: "Packaging" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Edit Product
        </h3>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>
                <div className="space-y-2">
                  {(formData.images || []).map((image, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      {/* If existing URL -> text input */}
                      {typeof image === "string" ? (
                        <>
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => updateImage(index, e.target.value)}
                            placeholder="Image URL"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image}
                            className="w-16 h-16 object-cover rounded"
                            alt={`img-${index}`}
                          />
                        </>
                      ) : (
                        // new file object (file + preview)
                        <>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) updateImage(index, f);
                              }}
                              className="w-full"
                            />
                          </div>
                          {image.preview && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image.preview}
                              className="w-16 h-16 object-cover rounded"
                              alt={`img-${index}`}
                            />
                          )}
                        </>
                      )}

                      <button
                        onClick={() => removeImage(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addImage}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  value={formData.yt_video_url || ""}
                  onChange={(e) =>
                    setFormData((prev: typeof formData) => ({
                      ...prev,
                      yt_video_url: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <button
                  onClick={addFeature}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-2">
                {formData.features?.map((feature, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(e) =>
                        updateFeature(index, "name", e.target.value)
                      }
                      placeholder="Feature name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={feature.weight || ""}
                      onChange={(e) =>
                        updateFeature(
                          index,
                          "weight",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Weight"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packaging Tab */}
          {activeTab === "packaging" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Packaging Information
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length
                  </label>
                  <input
                    type="number"
                    value={formData.packaging?.length || ""}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        packaging: {
                          ...prev.packaging,
                          length: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={formData.packaging?.width || ""}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        packaging: {
                          ...prev.packaging,
                          width: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={formData.packaging?.height || ""}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        packaging: {
                          ...prev.packaging,
                          height: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleUpdate}
            disabled={loading || !formData.name.trim() || !formData.slug.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;
