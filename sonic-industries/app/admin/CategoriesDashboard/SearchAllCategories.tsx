import { CategoryBackend, SearchAllCategoryProps } from "@/types";
import { Edit2, Trash2, Tag, Hash } from "lucide-react";
import Link from "next/link";

const SearchAllCategories = ({
  categories,
  startEdit,
  handleDelete,
}: SearchAllCategoryProps) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header Stats */}
      <div className="rounded-xl border border-indigo-200 bg-linear-to-r from-indigo-50 to-purple-50 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            Total Categories:{" "}
            <span className="text-indigo-600">{categories.length}</span>
          </h2>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: CategoryBackend) => (
          <div
            key={category._id}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 sm:p-5 transition-all hover:border-indigo-300 hover:shadow-lg"
          >
            {/* Icon & Name */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 transition-transform group-hover:scale-110">
                  <Tag className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
                  {category.name}
                </h3>
              </div>
            </div>

            {/* Slug */}
            <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <Hash className="h-3.5 w-3.5" />
              <span className="rounded bg-gray-100 px-2 py-1 font-mono break-all">
                {category.slug}
              </span>
            </div>

            {/* Link */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <span className="font-medium">Link:</span>
              <Link
                href={`/${category.slug}`}
                className="rounded bg-gray-100 px-2 py-1 font-mono break-all text-blue-600 hover:underline"
              >
                {process.env.NEXT_PUBLIC_FRONTEND_URL}/{category.slug}
              </Link>
            </div>

            {/* Description */}
            <p className="mb-4 text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-3 min-h-14">
              {category.description || "No description provided"}
            </p>

            {/* Divider */}
            <div className="my-3 border-t border-gray-200" />

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => startEdit(category)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow cursor-pointer"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(category._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:bg-red-700 hover:shadow cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <Tag className="mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            No Categories Yet
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Create your first category to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchAllCategories;