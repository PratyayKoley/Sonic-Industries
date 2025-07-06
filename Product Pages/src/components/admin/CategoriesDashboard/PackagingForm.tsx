import { useState } from "react";
import { Plus, X, Package } from "lucide-react";
import { FormDataType, CategoryPackaged } from "@/types";

interface PackagingFormProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const PackagingForm = ({ formData, setFormData }: PackagingFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState<CategoryPackaged>({
    items: [],
    length: 0,
    width: 0,
    height: 0,
  });
  const [newItem, setNewItem] = useState({ name: "", desc: "" });

  const handleAddPackage = () => {
    if (
      newPackage.length > 0 &&
      newPackage.width > 0 &&
      newPackage.height > 0
    ) {
      setFormData((prev) => ({
        ...prev,
        packaged: [...prev.packaged, newPackage],
      }));
      setNewPackage({ items: [], length: 0, width: 0, height: 0 });
      setShowAddForm(false);
    }
  };

  const handleRemovePackage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      packaged: prev.packaged.filter((_, i) => i !== index),
    }));
  };

  const handleAddItemToPackage = () => {
    if (newItem.name.trim()) {
      setNewPackage((prev) => ({
        ...prev,
        items: [...(prev.items ?? []), newItem],
      }));
      setNewItem({ name: "", desc: "" });
    }
  };

  const handleRemoveItemFromPackage = (itemIndex: number) => {
    setNewPackage((prev) => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== itemIndex),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Packaging</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Add Package Form */}
      {showAddForm && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Package Dimensions</h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length (cm) *
                </label>
                <input
                  type="number"
                  value={newPackage.length}
                  onChange={(e) =>
                    setNewPackage((prev) => ({
                      ...prev,
                      length: Number(e.target.value),
                    }))
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm) *
                </label>
                <input
                  type="number"
                  value={newPackage.width}
                  onChange={(e) =>
                    setNewPackage((prev) => ({
                      ...prev,
                      width: Number(e.target.value),
                    }))
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  value={newPackage.height}
                  onChange={(e) =>
                    setNewPackage((prev) => ({
                      ...prev,
                      height: Number(e.target.value),
                    }))
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Package Items</h4>

              {/* Add Item Form */}
              <div className="border border-gray-200 rounded-lg p-3 bg-white mb-3">
                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Item name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <textarea
                      value={newItem.desc}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          desc: e.target.value,
                        }))
                      }
                      placeholder="Item description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleAddItemToPackage}
                    disabled={!newItem.name.trim()}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {newPackage.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-2 bg-gray-100 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      {item.desc && (
                        <div className="text-xs text-gray-600">{item.desc}</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItemFromPackage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddPackage}
                disabled={
                  !newPackage.length || !newPackage.width || !newPackage.height
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Add Package
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewPackage({ items: [], length: 0, width: 0, height: 0 });
                  setNewItem({ name: "", desc: "" });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="space-y-3">
        {formData.packaged.map((pkg, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">
                  Package {index + 1}
                </h4>
              </div>
              <button
                onClick={() => handleRemovePackage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Length:</span>
                <span className="ml-1">{pkg.length} cm</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Width:</span>
                <span className="ml-1">{pkg.width} cm</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Height:</span>
                <span className="ml-1">{pkg.height} cm</span>
              </div>
            </div>

            {(pkg.items ?? []).length > 0 && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">
                  Items {(pkg.items ?? []).length}:
                </h5>
                <div className="space-y-1">
                  {(pkg.items ?? []).map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-gray-50 p-2 rounded text-sm"
                    >
                      <div className="font-medium">{item.name}</div>
                      {item.desc && (
                        <div className="text-gray-600 text-xs">{item.desc}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {formData.packaged.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          No packages added yet. Click "Add Package" to get started.
        </div>
      )}
    </div>
  );
};

export default PackagingForm;
