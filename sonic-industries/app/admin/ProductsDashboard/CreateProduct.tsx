import { Plus } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CreateProductProps, ProductFormTab } from "@/types";
import BasicForm from "./BasicForm";
import PricingForm from "./PricingForm";
import DetailsForm from "./DetailsForm";
import FeaturesForm from "./FeaturesForm";
import PackagingForm from "./PackagingForm";
import VideoForm from "./VideoForm";

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

      // Transform the data to match the MongoDB schema
      const transformedData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        tagline: formData.tagline,
        categoryId: formData.categoryId,
        price: formData.price,
        mrp: formData.mrp || undefined,
        stock: formData.stock,
        images: formData.images.filter((img) => img.trim() !== ""),
        rating: formData.rating || 0,
        num_reviews: formData.num_reviews || 0,
        sku: formData.sku || undefined,
        size: formData.size || undefined,
        color: formData.color || undefined,
        material: formData.material || undefined,
        countryOfOrigin: formData.countryOfOrigin || undefined,
        hsnCode: formData.hsnCode || undefined,
        features: formData.features.map((feature) => ({
          name: feature.name,
          weight: feature.weight,
        })),
        packaging: {
          length: formData.packaging.length || 0,
          width: formData.packaging.width || 0,
          height: formData.packaging.height || 0,
        },
        yt_video_url: formData.yt_video_url || undefined,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts([...products, response.data.newProduct]);
      setSuccess("Product created successfully!");
      resetForm();
      setActiveTab("browse");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to create product");
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
      mrp: 0,
      stock: 0,
      images: [],
      rating: 0,
      num_reviews: 0,
      sku: "",
      size: "",
      color: "",
      material: "",
      countryOfOrigin: "",
      hsnCode: "",
      features: [],
      packaging: {
        length: 0,
        width: 0,
        height: 0,
      },
      yt_video_url: "",
    });
    setIsEditing(false);
    setSelectedProduct(null);
    setActiveFormTab("basic");
  };

  const tabs: { key: ProductFormTab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "pricing", label: "Pricing & Stock" },
    { key: "details", label: "Details" },
    { key: "features", label: "Features" },
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
      case "details":
        return <DetailsForm formData={formData} setFormData={setFormData} />;
      case "features":
        return <FeaturesForm formData={formData} setFormData={setFormData} />;
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
              {formData.price > 0 ? `₹${formData.price}` : "Not set"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Stock:</span>
            <span className="ml-2">{formData.stock}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">SKU:</span>
            <span className="ml-2">{formData.sku || "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Images:</span>
            <span className="ml-2">
              {formData.images.filter((img) => img.trim() !== "").length}
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
