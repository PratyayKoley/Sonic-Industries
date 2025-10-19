import { Plus } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CreateDealProps, DealFormTab } from "@/types";
import BasicForm from "./BasicForm";
import PricingForm from "./PricingForm";
import ImageRatingForm from "./ImageRatingForm";
import { useState } from "react";

const CreateDeal = ({
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
  activeFormTab,
  setActiveFormTab,
  deals,
  products,
}: CreateDealProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dealType, setDealType] = useState<"general" | "product" | "">("");

  const handleCreate = async () => {
    if (
      !formData.title.trim() ||
      !formData.discountedPrice ||
      !formData.couponCode
    ) {
      setError("Title, discounted price, and coupon code are required");
      return;
    }

    if (!dealType) {
      setError("Please select a deal type first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      let response;

      if (imageFile) {
        // 🧾 Case 1: File upload
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("rating", formData.rating.toString());
        formDataToSend.append(
          "expiresAt",
          new Date(formData.expiresAt).toISOString()
        );
        formDataToSend.append("couponCode", formData.couponCode);
        formDataToSend.append("dealType", formData.dealType);
        formDataToSend.append("imageFile", imageFile); // 👈 the actual file
        if (formData.dealType === "product") {
          formDataToSend.append("mrp", formData.mrp!.toString());
          formDataToSend.append(
            "discountPercent",
            formData.discountPercent!.toString()
          );
          formDataToSend.append(
            "discountedPrice",
            formData.discountedPrice.toString()
          );
          formDataToSend.append("productName", formData.productName!);
        } else {
          // general deal — only discountedPrice matters
          formDataToSend.append(
            "discountedPrice",
            formData.discountedPrice.toString()
          );
        }

        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // 🌐 Case 2: URL upload
        const transformedData = {
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl, // 👈 plain URL
          dealType: formData.dealType,
          rating: formData.rating,
          expiresAt: new Date(formData.expiresAt).toISOString(),
          couponCode: formData.couponCode,

          ...(formData.dealType === "product"
            ? {
                mrp: formData.mrp!,
                discountPercent: formData.discountPercent!,
                discountedPrice: formData.discountedPrice,
                productName: formData.productName!,
              }
            : {
                discountedPrice: formData.discountedPrice,
              }),
        };

        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals`,
          transformedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      setDeals([...deals, response.data.deal]);
      setSuccess("Deal created successfully!");
      resetForm();
      setActiveTab("browse");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to create deal");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setIsEditing(false);
    setSelectedDeal(null);
    setActiveFormTab("basic");
  };

  const tabs: { key: DealFormTab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "pricing", label: "Pricing" },
    { key: "image-rating", label: "Image Rating" },
  ];

  const renderActiveForm = () => {
    switch (activeFormTab) {
      case "basic":
        return (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            dealType={dealType}
            products={products}
          />
        );
      case "pricing":
        return (
          <PricingForm
            formData={formData}
            setFormData={setFormData}
            dealType={dealType}
          />
        );
      case "image-rating":
        return (
          <ImageRatingForm
            formData={formData}
            setFormData={setFormData}
            setImageFile={setImageFile}
          />
        );
      default:
        return (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            dealType={dealType}
            products={products}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Select Deal Type */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-2">Select Deal Type *</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setDealType("general"),
                setFormData((prev) => ({ ...prev, dealType: "general", productName: "", mrp: 0, discountPercent: 0 }));
            }}
            className={`px-4 py-2 rounded-md border ${
              dealType === "general"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            General Deal
          </button>
          <button
            onClick={() => {
              setDealType("product"),
                setFormData((prev) => ({ ...prev, dealType: "product", discountedPrice: 0}));
            }}
            className={`px-4 py-2 rounded-md border ${
              dealType === "product"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Product Deal
          </button>
        </div>
      </div>

      {/* Form Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFormTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeFormTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <div className="mb-6">{renderActiveForm()}</div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleCreate}
          disabled={loading || !formData.title.trim()}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Creating..." : "Create Deal"}
        </button>
        <button
          onClick={resetForm}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Form Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Form Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Name:</span>
            <span className="ml-2">{formData.title || "Not set"}</span>
          </div>
          {dealType === "product" && (
            <div>
              <span className="font-medium text-gray-700">Product Name:</span>
              <span className="ml-2">{formData.productName || "Not set"}</span>
            </div>
          )}
          <div>
            <span className="font-medium text-gray-700">Description:</span>
            <span className="ml-2">{formData.description || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Image URL:</span>
            <span className="ml-2">{formData.imageUrl || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Original Price:</span>
            <span className="ml-2">{formData.mrp || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Discounted Price:</span>
            <span className="ml-2">
              {formData.discountedPrice || "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Rating:</span>
            <span className="ml-2">{formData.rating || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Expires At:</span>
            <span className="ml-2">{formData.expiresAt || "Not set"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeal;
