"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { X, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { CategoryBackend, CategoryFeatures, CategoryLabels } from "@/types";
import CreateCategory from "./CreateCategory";
import SearchBySlug from "./SearchBySlug";
import EditingModal from "./EditingModal";
import SearchAllCategories from "./SearchAllCategories";

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState<CategoryBackend[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryBackend | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"browse" | "search" | "create">(
    "browse"
  );
  const [activeFormTab, setActiveFormTab] = useState<
    "basic" | "features" | "labels" | "video"
  >("basic");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    features: [] as CategoryFeatures[],
    labels: [] as CategoryLabels[],
    yt_video_url: "",
  });

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
      );
      setCategories(response.data.categories || []);
    } catch {
      setError(
        "Failed to load categories. Make sure you have a GET /api/categories endpoint."
      );
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); // Adjust this based on your auth implementation

      // Find the category to get its slug
      const categoryToDelete = categories.find((cat) => cat._id === categoryId);
      if (!categoryToDelete) {
        setError("Category not found");
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryToDelete.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(categories.filter((cat) => cat._id !== categoryId));
      setSuccess("Category deleted successfully!");
      if (selectedCategory?._id === categoryId) {
        setSelectedCategory(null);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category: CategoryBackend) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      features: category.features || [],
      labels: category.labels || [],
      yt_video_url: category.yt_video_url || "",
    });
    setIsEditing(true);
    setActiveFormTab("basic");
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const CreateCategoryProps = {
    formData,
    setFormData,
    loading,
    setLoading,
    setError,
    setCategories,
    setSuccess,
    setActiveTab,
    setIsEditing,
    setSelectedCategory,
    setActiveFormTab,
    categories,
    activeFormTab,
  };

  const SearchBySlugProps = {
    loading,
    setLoading,
    setError,
    startEdit,
    handleDelete,
  };

  const EditingModalProps = {
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
  };

  const SearchAllCategoriesProps = {
    categories,
    startEdit,
    handleDelete,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Categories Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your website categories with ease
              </p>
            </div>
            <button
              onClick={loadAllCategories}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-red-600 hover:text-red-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">{success}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "browse"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Browse All ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "search"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Search by Slug
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "create"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Create New
            </button>
          </div>

          <div className="p-6">
            {/* Browse Tab */}
            {activeTab === "browse" && (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading categories...</p>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No categories found. Create your first category!</p>
                  </div>
                ) : (
                  <SearchAllCategories {...SearchAllCategoriesProps} />
                )}
              </div>
            )}

            {activeTab === "search" && <SearchBySlug {...SearchBySlugProps} />}

            {activeTab === "create" && (
              <CreateCategory {...CreateCategoryProps} />
            )}
          </div>
        </div>

        {isEditing && selectedCategory && (
          <EditingModal {...EditingModalProps} />
        )}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
