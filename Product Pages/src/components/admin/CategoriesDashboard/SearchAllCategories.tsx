import { CategoryBackend, SearchAllCategoryProps } from "@/types";
import { Edit2, Trash2 } from "lucide-react";

const SearchAllCategories = ({
  categories,
  startEdit,
  handleDelete,
}: SearchAllCategoryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category: CategoryBackend) => (
        <div
          key={category._id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Slug: {category.slug}</p>
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {category.description}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => startEdit(category)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(category._id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchAllCategories;
