"use client";

import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Plus, X } from "lucide-react";
import { ProductCharacteristics, ProductFormDataType } from "@/types";

interface CharacteristicsFormProps {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const CharacteristicsForm = ({
  formData,
  setFormData,
}: CharacteristicsFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [newFeature, setNewFeature] = useState<ProductCharacteristics>({
    image: "",
    name: "",
    desc: "",
  });

  // Helper function to check if an icon name is valid
  const isValidIcon = (iconName: string): boolean => {
    if (!iconName || typeof iconName !== "string" || iconName.trim() === "") {
      return false;
    }

    // Filter out problematic exports from lucide-react
    const invalidNames = ["createLucideIcon", "default", "LucideIcon"];
    if (invalidNames.some((invalid) => iconName.includes(invalid))) {
      return false;
    }

    try {
      const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
      // Accept both functions and objects (some versions export differently)
      return (
        typeof IconComponent === "function" ||
        (typeof IconComponent === "object" && IconComponent !== null)
      );
    } catch {
      return false;
    }
  };

  // Helper function to safely render an icon
  const renderIcon = (iconName: string, className: string = "") => {
    if (!isValidIcon(iconName)) {
      return null;
    }

    try {
      const IconComponent = LucideIcons[
        iconName as keyof typeof LucideIcons
      ] as React.ComponentType<{
        className?: string;
      }>;
      return <IconComponent className={className} />;
    } catch (error) {
      console.warn(`Failed to render icon: ${iconName}`, error);
      return null;
    }
  };

  const handleAddFeature = () => {
    if (
      newFeature.name?.trim() &&
      newFeature.image?.trim() &&
      isValidIcon(newFeature.image)
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }));
      setNewFeature({ image: "", name: "", desc: "" });
      setIconSearch("");
      setShowAddForm(false);
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description Line 1
        </label>
        <input
          type="text"
          value={formData.characteristics?.desc1 || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              characteristics: { ...prev.characteristics, desc1: e.target.value },
            }))
          }
          placeholder="Enter description line 1"
          className="w-full px-3 py-2 border rounded-lg mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description Line 2
        </label>
        <input
          type="text"
          value={formData.characteristics?.desc2 || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              characteristics: { ...prev.characteristics, desc2: e.target.value },
            }))
          }
          placeholder="Enter description line 2"
          className="w-full px-3 py-2 border rounded-lg mt-1"
        />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Characteristic Items</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Characteristic Item
        </button>
      </div>

      {/* Add Feature Form */}
      {showAddForm && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Characteristic Name *
              </label>
              <input
                type="text"
                value={newFeature.name || ""}
                onChange={(e) =>
                  setNewFeature((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter feature name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newFeature.desc || ""}
                onChange={(e) =>
                  setNewFeature((prev) => ({ ...prev, desc: e.target.value }))
                }
                placeholder="Enter feature description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Icon
              </label>
              <input
                type="text"
                placeholder="Search icons... (try: truck, car, home, user)"
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-white grid grid-cols-2 gap-2">
                {(() => {
                  const searchTerm = iconSearch.toLowerCase().trim();

                  const filteredIcons = Object.entries(LucideIcons)
                    .filter(([name, IconComponent]) => {
                      // Filter out non-components (accept both functions and objects)
                      if (
                        typeof IconComponent !== "function" &&
                        typeof IconComponent !== "object"
                      )
                        return false;
                      if (IconComponent === null) return false;

                      // Filter out utility functions and non-icon exports
                      const invalidNames = [
                        "createLucideIcon",
                        "default",
                        "LucideIcon",
                      ];
                      if (
                        invalidNames.some((invalid) => name.includes(invalid))
                      )
                        return false;

                      // Search filter - case insensitive
                      if (searchTerm === "") return true;

                      return name.toLowerCase().includes(searchTerm);
                    })
                    .slice(0, 20); // Limit results for performance

                  return filteredIcons
                    .map(([name, IconComponent]) => {
                      try {
                        const Icon = IconComponent as React.ComponentType<{
                          className?: string;
                        }>;
                        return (
                          <button
                            key={name}
                            type="button"
                            className={`flex items-center gap-2 p-2 rounded hover:bg-blue-100 w-full text-left ${
                              newFeature.image === name ? "bg-blue-200" : ""
                            }`}
                            onClick={() =>
                              setNewFeature((prev) => ({
                                ...prev,
                                image: name,
                              }))
                            }
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{name}</span>
                          </button>
                        );
                      } catch (error) {
                        console.warn(
                          `Failed to render icon button for: ${name}`,
                          error
                        );
                        return null;
                      }
                    })
                    .filter(Boolean);
                })()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddFeature}
                disabled={
                  !newFeature.name?.trim() ||
                  !isValidIcon(newFeature.image || "")
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Feature
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewFeature({ image: "", name: "", desc: "" });
                  setIconSearch("");
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features List */}
      <div className="space-y-3">
        {formData.characteristics?.items?.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{feature.name}</h4>
              <button
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {feature.desc && (
              <p className="text-sm text-gray-600 mb-2">{feature.desc}</p>
            )}
            {feature.image && isValidIcon(feature.image) && (
              <div className="flex items-center gap-2">
                {renderIcon(feature.image, "w-6 h-6 text-gray-700")}
                <span className="text-xs text-gray-500">{feature.image}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {formData.features.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          No features added yet. Click &quot;Add Feature&quot; to get started.
        </div>
      )}
    </div>
  );
};

export default CharacteristicsForm;
