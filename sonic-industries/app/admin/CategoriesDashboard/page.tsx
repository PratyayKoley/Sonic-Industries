"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { X, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { CategoryBackend, CategoryFeatures, FeaturesBlock } from "@/types";
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
    "basic" | "features" | "video"
  >("basic");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    title: "",
    description: "",
    features: {
      desc1: "",
      desc2: "",
      items: [] as CategoryFeatures[],
    } as FeaturesBlock,
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
      title: category.title,
      description: category.description || "",
      features: category.features || {
        desc1: "",
        desc2: "",
        items: [],
      },
      yt_video_url: category.yt_video_url || "",
    });
    setIsEditing(true);
    setActiveFormTab("basic");
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

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 sm:py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Categories Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your website categories
              </p>
            </div>

            <button
              onClick={loadAllCategories}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
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
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-sm sm:text-base">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <span className="text-red-800 flex-1">{error}</span>
            <button onClick={clearMessages}>
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-sm sm:text-base">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <span className="text-green-800 flex-1">{success}</span>
            <button onClick={clearMessages}>
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex overflow-x-auto scrollbar-hide border-b">
            {[
              { id: "browse", label: `Browse (${categories.length})` },
              { id: "search", label: "Search by Slug" },
              { id: "create", label: "Create New" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 whitespace-nowrap text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "browse" && (
              <>
                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm sm:text-base text-gray-600">
                      Loading categories...
                    </p>
                  </div>
                ) : categories.length === 0 ? (
                  <p className="text-center text-sm sm:text-base text-gray-500">
                    No categories found.
                  </p>
                ) : (
                  <SearchAllCategories
                    categories={categories}
                    startEdit={() => {}}
                    handleDelete={() => {}}
                  />
                )}
              </>
            )}

            {activeTab === "search" && <SearchBySlug {...SearchBySlugProps} />}
            {activeTab === "create" && (
              <CreateCategory {...CreateCategoryProps} />
            )}
          </div>
        </div>

        {isEditing && selectedCategory && (
          <EditingModal
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            setSuccess={setSuccess}
            setIsEditing={setIsEditing}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
