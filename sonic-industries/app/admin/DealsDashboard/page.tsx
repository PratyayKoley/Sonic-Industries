"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { X, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { DealBackend, DealFormDataType, ProductBackend } from "@/types";
import CreateDeal from "./CreateDeal";
import EditingModal from "./EditingModal";
import SearchAllDeals from "./SearchAllDeals";

const DealsDashboard = () => {
  const [deals, setDeals] = useState<DealBackend[]>([]);
  const [products, setProducts] = useState<ProductBackend[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<DealBackend | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse");
  const [activeFormTab, setActiveFormTab] = useState<
    "basic" | "pricing" | "image-rating"
  >("basic");

  const [formData, setFormData] = useState<DealFormDataType>({
    title: "",
    description: "",
    imageUrl: "",
    dealType: "",
    mrp: 0,
    discountPercent: 0,
    discountedPrice: 0,
    rating: 0,
    expiresAt: "",
    couponCode: "",
    productName: "",
  });

  useEffect(() => {
    loadAllDeals();
    loadAllProducts();
  }, []);

  const loadAllDeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals`
      );
      setDeals(response.data.deals || []);
    } catch {
      setError(
        "Failed to load deals. Make sure you have a GET /api/deals endpoint."
      );
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dealId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this deal? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals/${dealId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeals(deals.filter((deal) => deal._id !== dealId));
      setSuccess("Deal deleted successfully!");
      if (selectedDeal?._id === dealId) {
        setSelectedDeal(null);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to delete deal");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (deal: DealBackend) => {
    setSelectedDeal(deal);
    setFormData({
      title: deal.title,
      description: deal.description || "",
      imageUrl: deal.imageUrl || "",
      dealType: deal.dealType || "",
      mrp: deal.mrp || 0,
      discountPercent: deal.discountPercent || 0,
      discountedPrice: deal.discountedPrice || 0,
      rating: deal.rating || 0,
      expiresAt: deal.expiresAt ? new Date(deal.expiresAt).toISOString() : "",
      couponCode: deal.couponCode || "",
    });
    setIsEditing(true);
    setActiveFormTab("basic");
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const loadAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
      );
      setProducts(response.data.products || []);
    } catch (err) {
      const error = err as Error;
      console.error("Failed to load products:", error);
    }
  };

  const CreateDealProps = {
    formData,
    setFormData,
    loading,
    setLoading,
    setError,
    setDeals,
    setSuccess,
    setActiveTab,
    setIsEditing,
    setSelectedDeal,
    setActiveFormTab,
    deals,
    activeFormTab,
    products,
  };

  const EditingModalProps = {
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
  };

  const SearchAllDealsProps = {
    deals,
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
                Deals Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your website deals with ease
              </p>
            </div>
            <button
              onClick={loadAllDeals}
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
              Browse All ({deals.length})
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
                    <p className="text-gray-600">Loading deals...</p>
                  </div>
                ) : deals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No deals found. Create your first deal!</p>
                  </div>
                ) : (
                  <SearchAllDeals {...SearchAllDealsProps} />
                )}
              </div>
            )}

            {activeTab === "create" && <CreateDeal {...CreateDealProps} />}
          </div>
        </div>

        {isEditing && selectedDeal && <EditingModal {...EditingModalProps} />}
      </div>
    </div>
  );
};

export default DealsDashboard;
