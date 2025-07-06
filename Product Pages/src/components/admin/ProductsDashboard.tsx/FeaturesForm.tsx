import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { ProductFormDataType } from "@/types";

interface Feature {
  name: string;
  weight: number;
}

interface FeaturesFormProps {
  formData: ProductFormDataType
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const FeaturesForm = ({ formData, setFormData }: FeaturesFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFeature, setNewFeature] = useState<Feature>({
    name: "",
    weight: 0,
  });

  const handleAddFeature = () => {
    if (newFeature.name?.trim() && newFeature.weight > 0) {
      setFormData((prev: any) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }));
      setNewFeature({ name: "", weight: 0 });
      setShowAddForm(false);
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      features: prev.features.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleUpdateFeature = (index: number, field: keyof Feature, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      features: prev.features.map((feature: Feature, i: number) => 
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Features</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Feature
        </button>
      </div>

      {/* Add Feature Form */}
      {showAddForm && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature Name *
              </label>
              <input
                type="text"
                value={newFeature.name}
                onChange={(e) =>
                  setNewFeature((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter feature name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight *
              </label>
              <input
                type="number"
                value={newFeature.weight}
                onChange={(e) =>
                  setNewFeature((prev) => ({ 
                    ...prev, 
                    weight: parseFloat(e.target.value) || 0 
                  }))
                }
                placeholder="Enter weight"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddFeature}
                disabled={!newFeature.name?.trim() || newFeature.weight <= 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Feature
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewFeature({ name: "", weight: 0 });
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
        {formData.features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feature Name
                </label>
                <input
                  type="text"
                  value={feature.name}
                  onChange={(e) => handleUpdateFeature(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter feature name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <input
                  type="number"
                  value={feature.weight}
                  onChange={(e) => handleUpdateFeature(index, 'weight', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <button
                onClick={() => handleRemoveFeature(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors mt-6"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formData.features.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          No features added yet. Click "Add Feature" to get started.
        </div>
      )}
    </div>
  );
};

export default FeaturesForm;