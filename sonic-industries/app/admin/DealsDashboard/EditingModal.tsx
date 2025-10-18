import { Save } from "lucide-react";
import axios, { AxiosError } from "axios";
import { DealBackend, DealEditingModalProps } from "@/types";

const EditingModal = ({
  selectedDeal,
  setSelectedDeal,
  formData,
  setFormData,
  loading,
  setLoading,
  setError,
  setSuccess,
  setIsEditing,
  deals,
  setDeals,
}: DealEditingModalProps) => {
  const handleUpdate = async () => {
    if (!selectedDeal || !formData.title.trim() || !formData.imageUrl.trim()) {
      setError("Title and image URL are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals/${selectedDeal._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDeals(
        deals.map((deal: DealBackend) =>
          deal._id === selectedDeal._id ? response.data.updatedDeal : deal
        )
      );
      setSuccess("Category updated successfully!");
      setIsEditing(false);
      setSelectedDeal(response.data.updatedCategory);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Edit Category
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deal Title *
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleUpdate}
            disabled={
              loading || !formData.title.trim() || !formData.imageUrl.trim()
            }
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
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
