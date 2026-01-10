import { Plus, Save, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CategoryBackend, EditingModalProps } from "@/types";
import { useState } from "react";
import * as LucideIcons from "lucide-react";

const EditingModal = ({
  selectedCategory,
  setSelectedCategory,
  formData,
  setFormData,
  loading,
  setLoading,
  setError,
  setSuccess,
  setIsEditing,
  categories,
  setCategories,
}: EditingModalProps) => {
  const [activeTab, setActiveTab] = useState<"basic" | "features">(
    "basic"
  );

  const handleUpdate = async () => {
    if (!selectedCategory || !formData.name.trim() || !formData.slug.trim()) {
      setError("Name and slug are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        {
          originalSlug: selectedCategory.slug,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCategories(
        categories.map((cat: CategoryBackend) =>
          cat._id === selectedCategory._id ? response.data.updatedCategory : cat
        )
      );
      setSuccess("Category updated successfully!");
      setIsEditing(false);
      setSelectedCategory(response.data.updatedCategory);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // ---------- FEATURES ----------
  const addFeature = () => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      features: {
        ...prev.features,
        items: [
          ...(prev.features?.items || []),
          { name: "", image: "", desc: "", iconSearch: "" },
        ],
      },
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features?.items?.filter((_, i) => i !== index) || [],
      },
    }));
  };

  const updateFeature = (
    index: number,
    field: "name" | "image" | "desc" | "iconSearch",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items:
          prev.features?.items?.map((feature, i) =>
            i === index ? { ...feature, [field]: value } : feature
          ) || [],
      },
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "features", label: "Features" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Edit Category
        </h3>

        {/* TAB NAVIGATION */}
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

        {/* ---------------- BASIC INFO ---------------- */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev: typeof formData) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev: typeof formData) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* ---------------- FEATURES ---------------- */}
        {activeTab === "features" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description 1
              </label>
              <textarea
                value={formData.features?.desc1 || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: {
                      ...prev.features,
                      desc1: e.target.value,
                      items: prev.features?.items || [],
                    },
                  }))
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description 2
              </label>
              <textarea
                value={formData.features?.desc2 || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: {
                      ...prev.features,
                      desc2: e.target.value,
                      items: prev.features?.items || [],
                    },
                  }))
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Feature Items
              </label>
              <button
                onClick={addFeature}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            {formData.features?.items?.length ? (
              formData.features.items.map((feature, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3 bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Feature {index + 1}
                    </span>
                    <button
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Feature Name"
                    value={feature.name || ""}
                    onChange={(e) =>
                      updateFeature(index, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Feature Description"
                    value={feature.desc || ""}
                    onChange={(e) =>
                      updateFeature(index, "desc", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Icon
                    </label>
                    <input
                      type="text"
                      placeholder="Search icon (e.g. home, user)"
                      value={feature.iconSearch || ""}
                      onChange={(e) =>
                        updateFeature(index, "iconSearch", e.target.value)
                      }
                      className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2 rounded-md">
                      {Object.entries(LucideIcons)
                        .filter(([name]) =>
                          name
                            .toLowerCase()
                            .includes((feature?.iconSearch ?? "").toLowerCase())
                        )
                        .slice(0, 15)
                        .map(([name, IconComponent]) => {
                          const Icon = IconComponent as React.ComponentType<{
                            className?: string;
                          }>;
                          return (
                            <button
                              key={name}
                              type="button"
                              className={`flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
                                feature.image === name ? "bg-blue-200" : ""
                              }`}
                              onClick={() =>
                                updateFeature(index, "image", name)
                              }
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-xs">{name}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No features added yet. Click &quot;Add Feature&quot; to create
                one.
              </p>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleUpdate}
            disabled={loading || !formData.name.trim() || !formData.slug.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;
