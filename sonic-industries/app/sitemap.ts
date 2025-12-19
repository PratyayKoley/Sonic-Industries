import { CategoryBackend, ProductBackend } from "@/types";
import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const frontend = process.env.NEXT_PUBLIC_FRONTEND_URL;

  // Fetch categories
  const categoriesRes = await axios.get(`${backend}/api/categories`);
  const categories: CategoryBackend[] = categoriesRes.data.categories || [];

  // Fetch products
  const productsRes = await axios.get(`${backend}/api/products`);
  const products: ProductBackend[] = productsRes.data.products || [];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${frontend}/${category.slug}`,
    lastModified: category.updatedAt || category.createdAt,
    changeFrequency: "weekly",
    priority: 1,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${frontend}/${product.slug}`,
    lastModified: product.updatedAt || product.createdAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...categoryUrls, ...productUrls];
}
