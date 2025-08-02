import React from "react";
import { Play } from "lucide-react";
import { ProductFormDataType } from "@/types";

interface VideoFormProps {
  formData: ProductFormDataType
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
}

const VideoForm = ({ formData, setFormData }: VideoFormProps) => {
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(formData.yt_video_url || '');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Play className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Product Video</h3>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Video URL
          </label>
          <input
            type="text"
            value={formData.yt_video_url || ''}
            onChange={(e) =>
              setFormData((prev: ProductFormDataType) => ({
                ...prev,
                yt_video_url: e.target.value,
              }))
            }
            placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter a YouTube video URL to showcase your product
          </p>
        </div>

        {/* Video Preview */}
        {videoId && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video preview"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {formData.yt_video_url && !videoId && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Please enter a valid YouTube URL. Supported formats:
            </p>
            <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside">
              <li>https://youtube.com/watch?v=VIDEO_ID</li>
              <li>https://youtu.be/VIDEO_ID</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoForm;