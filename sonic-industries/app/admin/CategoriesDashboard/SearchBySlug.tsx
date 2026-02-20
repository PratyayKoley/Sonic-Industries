"use client";

import { CategoryBackend, SearchBySlugProps } from "@/types";
import { Trash2, Edit2, Search } from "lucide-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${searchSlug}`
      );
      toast.success(response.data.message);
      setSearchResults([response.data.category]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.status === 404) {
        setError("No category found with that slug.");
        toast.error("No category found with that slug.");
      } else {
        setError(
          error.response?.data?.message || "Search failed. Please try again."
        );
        toast.error(error.response?.data?.message || "Search failed. Please try again.")
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchSlug}
            onChange={(e) => setSearchSlug(e.target.value)}
            placeholder="Enter category slug to search..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-xs sm:text-sm md:text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading || !searchSlug.trim()}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-xs sm:text-sm md:text-base font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((category) => (
            <div
              key={category._id}
              className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
            >
              <h3 className="mb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                {category.name}
              </h3>

              <p className="mb-1 text-xs sm:text-sm text-gray-500 break-all">
                <span className="font-medium text-gray-700">Slug:</span>{" "}
                {category.slug}
              </p>

              <p className="mb-4 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                {category.description || "No description provided"}
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => startEdit(category)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
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