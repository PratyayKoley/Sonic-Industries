import { CategoryBackend, SearchBySlugProps } from "@/types";
import { Trash2, Edit2, Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const SearchBySlug = ({
  loading,
  setLoading,
  setError,
  startEdit,
  handleDelete,
}: SearchBySlugProps) => {
  const [searchSlug, setSearchSlug] = useState("");
  const [searchResults, setSearchResults] = useState<CategoryBackend[]>([]);

  const handleSearch = async () => {
    if (!searchSlug.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${searchSlug}`
      );
      setSearchResults([response.data.category]);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("No category found with that slug.");
        setSearchResults([]);
      } else {
        setError(
          err.response?.data?.message || "Search failed. Please try again."
        );
        setSearchResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchSlug}
            onChange={(e) => setSearchSlug(e.target.value)}
            placeholder="Enter category slug to search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !searchSlug.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-2">Slug: {category.slug}</p>
              <p className="text-gray-700 mb-4">{category.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(category)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBySlug;
