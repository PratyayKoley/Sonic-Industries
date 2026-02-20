import { Plus } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CreateProductProps, ProductFormTab } from "@/types";
import BasicForm from "./BasicForm";
import PricingForm from "./PricingForm";
import FeaturesForm from "./FeaturesForm";
import PackagingForm from "./PackagingForm";
import VideoForm from "./VideoForm";
import LabelsForm from "./LabelsForm";
import CharacteristicsForm from "./CharacteristicsForm";
import { toast } from "sonner";

const CreateProduct = ({
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
  activeFormTab,
  setActiveFormTab,
  products,
  categories,
}: CreateProductProps) => {
  const handleCreate = async () => {
    if (
      !formData.name.trim() ||
      !formData.slug.trim() ||
      !formData.categoryId
    ) {
      setError("Name, slug, and category are required");
      return;
    }

    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      // Build FormData (append scalar fields individually)
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("slug", formData.slug.trim());
      if (formData.description)
        payload.append("description", formData.description.trim());
      if (formData.tagline) payload.append("tagline", formData.tagline.trim());
      payload.append("categoryId", formData.categoryId);
      payload.append("price", String(formData.price));
      payload.append("rating", String(formData.rating || 0));
      // features and packaging might be objects/arrays -> stringify them
      payload.append("features", JSON.stringify(formData.features || []));
      payload.append("packaging", JSON.stringify(formData.packaging || {}));
      payload.append(
        "characteristics",
        JSON.stringify(formData.characteristics || [])
      );
      payload.append("labels", JSON.stringify(formData.labels || []));
      if (formData.yt_video_url)
        payload.append("yt_video_url", formData.yt_video_url.trim());
      if (formData.unboxing_yt_video_url)
        payload.append("unboxing_yt_video_url", formData.unboxing_yt_video_url.trim());

      // Append only NEW files (hybrid array: string | {file, preview})
      const images = formData.images || [];
      const existingImageUrls: string[] = [];

      images.forEach((img) => {
        if (typeof img === "string") {
          existingImageUrls.push(img);
        } else if (img.file instanceof File) {
          payload.append("images", img.file);
        }
      });

      // Send existing image URLs as separate field so backend can keep them without re-upload
      if (existingImageUrls.length > 0) {
        payload.append("existingImages", JSON.stringify(existingImageUrls));
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts([...products, response.data.newProduct]);
      setSuccess("Product created successfully!");
      toast.success(response.data.message);
      resetForm();
      setActiveTab("browse");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to create product");
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      tagline: "",
      categoryId: "",
      price: 0,
      images: [],
      rating: 0,
      features: [],
      characteristics: {
        desc1: "",
        desc2: "",
        items: [],
      },
      labels: [],
      packaging: {
        length: 0,
        width: 0,
        height: 0,
      },
      yt_video_url: "",
      unboxing_yt_video_url: "",
    });
    setIsEditing(false);
    setSelectedProduct(null);
    setActiveFormTab("basic");
  };

  const tabs: { key: ProductFormTab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "pricing", label: "Pricing & Stock" },
    { key: "features", label: "Features" },
    { key: "characteristics", label: "Characteristics" },
    { key: "labels", label: "Labels" },
    { key: "packaging", label: "Packaging" },
    { key: "video", label: "Video" },
  ];

  const renderActiveForm = () => {
    switch (activeFormTab) {
      case "basic":
        return (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
          />
        );
      case "pricing":
        return <PricingForm formData={formData} setFormData={setFormData} />;
      case "features":
        return <FeaturesForm formData={formData} setFormData={setFormData} />;
      case "characteristics":
        return (
          <CharacteristicsForm formData={formData} setFormData={setFormData} />
        );
      case "labels":
        return <LabelsForm formData={formData} setFormData={setFormData} />;
      case "packaging":
        return <PackagingForm formData={formData} setFormData={setFormData} />;
      case "video":
        return <VideoForm formData={formData} setFormData={setFormData} />;
      default:
        return (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
          />
        );
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category?.name || "Unknown";
  };

  return (
    <div className="max-w-4xl">
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
          disabled={
            loading ||
            !formData.name.trim() ||
            !formData.slug.trim() ||
            !formData.tagline.trim() ||
            !formData.categoryId ||
            formData.price <= 0
          }
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Creating..." : "Create Product"}
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
            <span className="ml-2">{formData.name || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Slug:</span>
            <span className="ml-2">{formData.slug || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Category:</span>
            <span className="ml-2">
              {formData.categoryId
                ? getCategoryName(formData.categoryId)
                : "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Price:</span>
            <span className="ml-2">
              {formData.price > 0 ? `₹ ${formData.price}` : "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Images:</span>
            <span className="ml-2">
              {formData.images ? formData.images.length : 0}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Features:</span>
            <span className="ml-2">{formData.features.length}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Video:</span>
            <span className="ml-2">
              {formData.yt_video_url ? "Set" : "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Unboxing Video:</span>
            <span className="ml-2">
              {formData.unboxing_yt_video_url ? "Set" : "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Packaging:</span>
            <span className="ml-2">
              {formData.packaging.length > 0 ||
              formData.packaging.width > 0 ||
              formData.packaging.height > 0
                ? "Set"
                : "Not set"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
