import { CategoryBackend, SearchAllCategoryProps } from "@/types";
import { Edit2, Trash2, Tag, Hash } from "lucide-react";

const SearchAllCategories = ({
  categories,
  startEdit,
  handleDelete,
}: SearchAllCategoryProps) => {
  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Total Categories: <span className="text-indigo-600">{categories.length}</span>
          </h2>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: CategoryBackend) => (
          <div
            key={category._id}
            className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all group cursor-pointer"
          >
            {/* Category Icon & Name */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Slug */}
            <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-500">
              <Hash className="w-3.5 h-3.5" />
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {category.slug}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3 min-h-12">
              {category.description || "No description provided"}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-3"></div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(category)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-1 shadow-sm hover:shadow cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex-1 shadow-sm hover:shadow cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No Categories Yet
          </h3>
          <p className="text-sm text-gray-500">
            Create your first category to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchAllCategories;