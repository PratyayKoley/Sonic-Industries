"use client";

import { Save, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  DealBackend,
  ProductBackend,
  DealFormTab,
  DealFormDataType,
} from "@/types";

import BasicForm from "./BasicForm";
import PricingForm from "./PricingForm";
import ImageRatingForm from "./ImageRatingForm";

interface EditingModalProps {
  selectedDeal: DealBackend | null;
  setSelectedDeal: (d: DealBackend | null) => void;
  setIsEditing: (v: boolean) => void;
  deals: DealBackend[];
  setDeals: (d: DealBackend[]) => void;
  setError: (v: string) => void;
  setSuccess: (v: string) => void;
  products: ProductBackend[];
}

const EditingModal = ({
  selectedDeal,
  setSelectedDeal,
  setIsEditing,
  deals,
  setDeals,
  setError,
  setSuccess,
  products,
}: EditingModalProps) => {
  const [activeTab, setActiveTab] = useState<DealFormTab>("basic");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // ✅ LOCAL DRAFT STATE (important)
  const [draft, setDraft] = useState<DealFormDataType>(() =>
    mapDealToDraft(selectedDeal!),
  );

  useEffect(() => {
    setDraft(mapDealToDraft(selectedDeal!));
  }, [selectedDeal]);

  /* -----------------------------
     Update Deal
  ----------------------------- */
  const handleSave = async () => {
    if (!draft.title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      let response;

      if (imageFile) {
        const fd = new FormData();
        Object.entries(draft).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            fd.append(key, String(value));
          }
        });
        fd.append("imageFile", imageFile);

        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals/${selectedDeal?._id}`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deals/${selectedDeal?._id}`,
          {
            ...draft,
            expiresAt: new Date(draft.expiresAt).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      setDeals(
        deals.map((d) =>
          d._id === selectedDeal?._id ? response.data.deal : d,
        ),
      );

      setSuccess("Deal updated successfully");
      close();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setIsEditing(false);
    setSelectedDeal(null);
  };

  /* -----------------------------
     Tabs
  ----------------------------- */
  const tabs: { key: DealFormTab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "pricing", label: "Pricing" },
    { key: "image-rating", label: "Image & Rating" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Deal</h2>
          <button onClick={close}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6 flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-2 text-sm font-medium ${
                activeTab === t.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "basic" && (
          <BasicForm
            formData={draft}
            setFormData={setDraft}
            dealType={draft.dealType as "general" | "product" | ""}
            products={products}
          />
        )}

        {activeTab === "pricing" && (
          <PricingForm
            formData={draft}
            setFormData={setDraft}
            dealType={draft.dealType as "general" | "product" | ""}
          />
        )}

        {activeTab === "image-rating" && (
          <ImageRatingForm
            formData={draft}
            setFormData={setDraft}
            setImageFile={setImageFile}
          />
        )}

        {/* Footer */}
        <div className="flex gap-3 mt-8 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={close}
            className="px-5 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;
``;
/* ----------------------------------
   Helpers
---------------------------------- */
function mapDealToDraft(deal: DealBackend) {
  return {
    title: deal.title ?? "",
    description: deal.description ?? "",
    imageUrl: deal.imageUrl ?? "",
    dealType: deal.dealType,

    discountedPrice: deal.discountedPrice ?? 0,
    rating: deal.rating ?? 0,
    expiresAt:
      deal.expiresAt instanceof Date
        ? deal.expiresAt.toISOString()
        : deal.expiresAt,
    couponCode: deal.couponCode ?? "",

    ...(deal.dealType === "product" && {
      productName: deal.productName ?? "",
      mrp: deal.mrp ?? 0,
      discountPercent: deal.discountPercent ?? 0,
    }),
  };
}
