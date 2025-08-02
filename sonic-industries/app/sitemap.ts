import { CategoryBackend } from "@/types";
import axios from "axios";

export default async function sitemap() {
  const getCategories = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
  );

  const category = getCategories.data.categories.map((category: CategoryBackend) => {
    return {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${category.slug}`,
      lastModified: category?.createdAt,
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      lastModified: new Date().toISOString(),
    },
    ...category,
  ];
}
