import { CategoryImages, ProductBackend } from "@/types";

export interface ResolvedVideo {
  yt_video_url?: string;
  unboxing_yt_video_url?: string;
}

export function getResolvedVideoData(
  productData: ProductBackend | null,
  allProductData: CategoryImages | null
): ResolvedVideo | null {
  // ✅ PRODUCT PAGE
  if (productData) {
    if (productData.yt_video_url || productData.unboxing_yt_video_url) {
      return {
        yt_video_url: productData.yt_video_url,
        unboxing_yt_video_url: productData.unboxing_yt_video_url,
      };
    }
    return null;
  }

  // ✅ CATEGORY PAGE
  if (allProductData?.products?.length) {
    const productWithVideo = allProductData.products.find(
      (p) => p.yt_video_url || p.unboxing_yt_video_url
    );

    if (!productWithVideo) return null;

    return {
      yt_video_url: productWithVideo.yt_video_url,
      unboxing_yt_video_url: productWithVideo.unboxing_yt_video_url,
    };
  }

  return null;
}
