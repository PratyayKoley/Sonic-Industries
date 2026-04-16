"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Testimonial = {
  _id: string;
  link: string;
};

const TestimonialsDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`,
      );
      setTestimonials(res.data.testimonials || []);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleCreate = async () => {
    if (!link) {
      toast.error("Please enter a YouTube Shorts link");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`,
        { link },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTestimonials([res.data.testimonial, ...testimonials]);
      setLink("");
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete testimonial
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTestimonials(testimonials.filter((t) => t._id !== id));
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Testimonials Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage YouTube Shorts testimonials
            </p>
          </div>

          <button
            onClick={loadTestimonials}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading && "animate-spin"}`} />
            Refresh
          </button>
        </div>

        {/* Add New */}
        <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-2">
          <input
            type="text"
            placeholder="Paste YouTube Shorts link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          {loading ? (
            <div className="text-center py-6">
              <RefreshCw className="animate-spin mx-auto" />
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t._id}
                  className="border rounded-lg overflow-hidden relative group"
                >
                  {/* Video */}
                  <iframe
                    src={t.link}
                    className="w-full h-64"
                    allowFullScreen
                  />

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsDashboard;
