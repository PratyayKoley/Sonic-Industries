import { FormDataType } from "@/types";
import { useState } from "react";

interface BasicFormProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const BasicForm = ({ formData, setFormData }: BasicFormProps) => {
  const [keywordInput, setKeywordInput] = useState("");
  const generateSlug = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (name: string) => {
    const trimmedName = name.replace(/^\s+/, "");
    setFormData((prev) => ({
      ...prev,
      name: trimmedName,
      slug: generateSlug(trimmedName),
    }));
  };

  const addKeywords = (text: string) => {
    const keywords = text
      .split(/[,\n]/) // Split by comma or newline
      .map((k) => k.trim())
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      keywords: [...new Set([...prev.keywords, ...keywords])],
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug *
        </label>

        <input
          type="text"
          value={formData.slug}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              slug: e.target.value.trimStart(),
            }))
          }
          placeholder="category-slug"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />

        <p className="text-xs text-gray-500 mt-1">
          Auto-generated from name, but you can customize it.
        </p>

        {/* Warning */}
        <p className="text-xs text-amber-600 mt-1 font-medium">
          ⚠️ This slug can only be selected once and cannot be changed later.
          Please choose carefully.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          placeholder="category-title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Enter category description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SEO Keywords
        </label>

        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();

            const pastedText = e.clipboardData.getData("text");
            addKeywords(pastedText);
            setKeywordInput("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();

              addKeywords(keywordInput);
              setKeywordInput("");
            }
          }}
          placeholder="Type or paste keywords"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <p className="text-xs text-gray-500 mt-1">
          Press <strong>Enter</strong> or <strong>,</strong> to add a keyword.
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {formData.keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              <span>{keyword}</span>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    keywords: prev.keywords.filter((_, i) => i !== index),
                  }))
                }
                className="text-blue-600 hover:text-red-600 font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicForm;
