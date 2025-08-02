import { Plus } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CreateCategoryProps, FormTab } from "@/types";
import BasicForm from "./BasicForm";
import FeaturesForm from "./FeaturesForm";
import LabelsForm from "./LabelsForm";
import VideoForm from "./VideoForm";
import PackagingForm from "./PackagingForm";

const CreateCategory = ({
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
  activeFormTab,
  setActiveFormTab,
  categories,
}: CreateCategoryProps) => {
  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.slug.trim()) {
      setError("Name and slug are required");
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
        features: formData.features.map(feature => ({
          image: feature.image || undefined,
          name: feature.name,
          desc: feature.desc || undefined,
        })),
        labels: formData.labels.map(label => ({
          x: label.x,
          y: label.y,
          name: label.name,
          desc: label.desc || undefined,
        })),
        yt_video_url: formData.yt_video_url,
        packaged: formData.packaged.map(pkg => ({
          items: pkg.items?.map(item => ({
            name: item.name,
            desc: item.desc || undefined,
          })),
          length: pkg.length,
          width: pkg.width,
          height: pkg.height,
        })),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCategories([...categories, response.data.newCategory]);
      setSuccess("Category created successfully!");
      resetForm();
      setActiveTab("browse");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      features: [],
      labels: [],
      yt_video_url: "",
      packaged: [],
    });
    setIsEditing(false);
    setSelectedCategory(null);
    setActiveFormTab("basic");
  };

  const tabs: { key: FormTab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "features", label: "Features" },
    { key: "labels", label: "Labels" },
    { key: "video", label: "Video" },
    { key: "packaging", label: "Packaging" },
  ];

  const renderActiveForm = () => {
    switch (activeFormTab) {
      case "basic":
        return <BasicForm formData={formData} setFormData={setFormData} />;
      case "features":
        return <FeaturesForm formData={formData} setFormData={setFormData} />;
      case "labels":
        return <LabelsForm formData={formData} setFormData={setFormData} />;
      case "video":
        return <VideoForm formData={formData} setFormData={setFormData} />;
      case "packaging":
        return <PackagingForm formData={formData} setFormData={setFormData} />;
      default:
        return <BasicForm formData={formData} setFormData={setFormData} />;
    }
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
      <div className="mb-6">
        {renderActiveForm()}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleCreate}
          disabled={loading || !formData.name.trim() || !formData.slug.trim()}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Creating..." : "Create Category"}
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
            <span className="font-medium text-gray-700">Features:</span>
            <span className="ml-2">{formData.features.length}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Labels:</span>
            <span className="ml-2">{formData.labels.length}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Video:</span>
            <span className="ml-2">{formData.yt_video_url ? "Set" : "Not set"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Packages:</span>
            <span className="ml-2">{formData.packaged.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;