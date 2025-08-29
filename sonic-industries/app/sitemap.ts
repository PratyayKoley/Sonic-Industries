import { CategoryBackend } from "@/types";
import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const getCategories = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
  );

  const category: MetadataRoute.Sitemap = getCategories.data.categories.map((category: CategoryBackend) => {
    return {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${category.slug}`,
      lastModified: category?.updatedAt || category?.createdAt,
    };
  });

  return [
    ...category
  ];
}
