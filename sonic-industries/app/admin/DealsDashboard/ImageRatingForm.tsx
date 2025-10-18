import { DealFormDataType } from "@/types";
import { Calendar, Check, Image as ImageIcon, Star } from "lucide-react";

interface ImageRatingFormProps {
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
}

const ImageRatingForm = ({ formData, setFormData }: ImageRatingFormProps) => {
  const handleChange = (
    field: keyof DealFormDataType,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  const handleDateChange = (value: string) => {
    if (value) {
      handleChange("expiresAt", new Date(value).toISOString());
    } else {
      handleChange("expiresAt", "");
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 p-8 rounded-2xl border border-rose-200/50 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Media & Details
          </h2>
          <p className="text-gray-600">
            Add image, rating, and expiry information
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-blue-600">
            Image URL
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
            />
          </div>
          {formData.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA0OEg5M1Y1NEg4N1Y0OFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+CjwvcGF0aD4KPC9zdmc+Cg==";
              }}
            /> 
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-blue-600">
              Rating
            </label>
            <div className="relative">
              <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.rating || ""}
                onChange={(e) =>
                  handleChange("rating", parseFloat(e.target.value) || 0)
                }
                placeholder="4.5"
                min="0"
                max="5"
                step="0.1"
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 transition-colors ${
                    star <= Math.floor(formData.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : star - 0.5 <= formData.rating
                      ? "text-yellow-400 fill-yellow-200"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({formData.rating}/5)
              </span>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-blue-600">
              Expires At
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                value={formatDateForInput(formData.expiresAt)}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-gray-800 shadow-sm hover:shadow-md"
              />
            </div>
            {formData.expiresAt && (
              <div className="mt-2 text-sm text-gray-600">
                Expires: {new Date(formData.expiresAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-rose-200/30">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">
            {formData.imageUrl && formData.rating > 0 && formData.expiresAt
              ? "All details completed!"
              : "Complete the remaining fields"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageRatingForm;
