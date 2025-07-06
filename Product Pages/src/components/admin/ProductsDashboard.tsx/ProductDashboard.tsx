import { useState, useEffect } from "react";
import axios from "axios";
import { X, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import {
  ProductBackend,
  ProductFeatures,
  ProductPackaged,
  CategoryBackend,
} from "@/types";
import CreateProduct from "./CreateProduct";
import SearchBySlug from "./SearchBySlug";
import EditingModal from "./EditingModal";
import SearchAllProducts from "./SearchAllProducts";

const ProductsDashboard = () => {
  const [products, setProducts] = useState<ProductBackend[]>([]);
  const [categories, setCategories] = useState<CategoryBackend[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductBackend | null>(
    null
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"browse" | "search" | "create">(
    "browse"
  );
  const [activeFormTab, setActiveFormTab] = useState<
    "basic" | "pricing" | "details" | "features" | "packaging" | "video"
  >("basic");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    tagline: "",
    categoryId: "",
    price: 0,
    mrp: 0,
    stock: 0,
    images: [] as string[],
    rating: 0,
    num_reviews: 0,
    sku: "",
    size: "",
    color: "",
    material: "",
    countryOfOrigin: "",
    hsnCode: "",
    features: [] as ProductFeatures[],
    packaging: {
      length: 0,
      width: 0,
      height: 0,
    } as ProductPackaged,
    yt_video_url: "",
  });

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`
      );
      setProducts(response.data.products || []);
    } catch (err: any) {
      setError(
        "Failed to load products. Make sure you have a GET /api/products endpoint."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );
      setCategories(response.data.categories || []);
    } catch (err: any) {
      console.error("Failed to load categories:", err);
    }
  };

  const handleDelete = async (productId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); // Adjust this based on your auth implementation

      // Find the product to get its slug
      const productToDelete = products.find((prod) => prod._id === productId);
      if (!productToDelete) {
        setError("Product not found");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${
          productToDelete.slug
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(products.filter((prod) => prod._id !== productId));
      setSuccess("Product deleted successfully!");
      if (selectedProduct?._id === productId) {
        setSelectedProduct(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product: ProductBackend) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      tagline: product.tagline || "",
      categoryId: product.categoryId || "",
      price: product.price || 0,
      mrp: product.mrp || 0,
      stock: product.stock || 0,
      images: product.images || [],
      rating: product.rating || 0,
      num_reviews: product.num_reviews || 0,
      sku: product.sku || "",
      size: product.size || "",
      color: product.color || "",
      material: product.material || "",
      countryOfOrigin: product.countryOfOrigin || "",
      hsnCode: product.hsnCode || "",
      features: product.features || [],
      packaging: {
        length: product.packaging?.length ?? 0,
        width: product.packaging?.width ?? 0,
        height: product.packaging?.height ?? 0,
      },
      yt_video_url: product.yt_video_url || "",
    });
    setIsEditing(true);
    setActiveFormTab("basic");
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const CreateProductProps = {
    formData,
    setFormData,
    loading,
    setLoading,
    setError,
    setProducts,
    setSuccess,
    setActiveTab,
    setIsEditing,
    setSelectedProduct,
    setActiveFormTab,
    products,
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
    selectedProduct,
    setSelectedProduct,
    formData,
    setFormData,
    loading,
    setLoading,
    setError,
    setSuccess,
    setIsEditing,
    products,
    setProducts,
    categories,
  };

  const SearchAllProductsProps = {
    products,
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
                Products Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your product catalog with ease
              </p>
            </div>
            <button
              onClick={loadAllProducts}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
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
              className="ml-auto text-red-600 hover:text-red-800"
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
              Browse All ({products.length})
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
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No products found. Create your first product!</p>
                  </div>
                ) : (
                  <SearchAllProducts {...SearchAllProductsProps} />
                )}
              </div>
            )}

            {activeTab === "search" && <SearchBySlug {...SearchBySlugProps} />}

            {activeTab === "create" && (
              <CreateProduct {...CreateProductProps} />
            )}
          </div>
        </div>

        {isEditing && selectedProduct && (
          <EditingModal {...EditingModalProps} />
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;
