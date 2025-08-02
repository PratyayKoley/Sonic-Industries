"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { FormDataType, CategoryLabels } from "@/types";

interface LabelsFormProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const LabelsForm = ({ formData, setFormData }: LabelsFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState<CategoryLabels>({
    x: 0,
    y: 0,
    name: "",
    desc: "",
  });

  const handleAddLabel = () => {
    if (newLabel.name?.trim()) {
      setFormData((prev) => ({
        ...prev,
        labels: [...prev.labels, newLabel],
      }));
      setNewLabel({ x: 0, y: 0, name: "", desc: "" });
      setShowAddForm(false);
    }
  };

  const handleRemoveLabel = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Labels</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Label
        </button>
      </div>

      {/* Add Label Form */}
      {showAddForm && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label Name *
              </label>
              <input
                type="text"
                value={newLabel.name}
                onChange={(e) =>
                  setNewLabel((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter label name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newLabel.desc}
                onChange={(e) =>
                  setNewLabel((prev) => ({ ...prev, desc: e.target.value }))
                }
                placeholder="Enter label description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  X Position
                </label>
                <input
                  type="number"
                  value={newLabel.x}
                  onChange={(e) =>
                    setNewLabel((prev) => ({ ...prev, x: Number(e.target.value) }))
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Y Position
                </label>
                <input
                  type="number"
                  value={newLabel.y}
                  onChange={(e) =>
                    setNewLabel((prev) => ({ ...prev, y: Number(e.target.value) }))
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddLabel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Label
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewLabel({ x: 0, y: 0, name: "", desc: "" });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Labels List */}
      <div className="space-y-3">
        {formData.labels.map((label, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{label.name}</h4>
              <button
                onClick={() => handleRemoveLabel(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {label.desc && (
              <p className="text-sm text-gray-600 mb-2">{label.desc}</p>
            )}
            <div className="flex gap-4 text-sm text-gray-500">
              <span>X: {label.x}</span>
              <span>Y: {label.y}</span>
            </div>
          </div>
        ))}
      </div>

      {formData.labels.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          No labels added yet. Click &quot;Add Label&quot; to get started.
        </div>
      )}
    </div>
  );
};

export default LabelsForm;