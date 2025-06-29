import { useState } from "react";
import axios from "axios";
import { ProductBackend } from "@/types";

const ProductDashboard = () => {
  const [slug, setSlug] = useState("");
  const [product, setProduct] = useState<ProductBackend | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${slug}`
      );
      setProduct(response.data.product);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("No product found.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Search Product by Slug</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter product slug"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !slug.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {product && (
        <div className="bg-gray-100 p-4 rounded-md space-y-2">
          <h3 className="text-lg font-semibold">Product Info</h3>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Slug:</strong> {product.slug}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>

          {/* Add more fields here as needed */}

          <div className="flex gap-4 mt-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Update
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboard;
