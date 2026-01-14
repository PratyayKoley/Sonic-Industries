import HomeClient from "./HomeClient";
import { CategoryBackend } from "@/types";
import type { Metadata } from "next";

// Optional SEO metadata for home page
export const metadata: Metadata = {
  title: "Sonic Industries | Packaging Machinery Manufacturer",
  description:
    "Sonic Industries is a leading manufacturer of packaging machinery, coding solutions, and automation systems across India.",
};

const getCategories = async (): Promise<CategoryBackend[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      {
        next: { revalidate: 3600 }, // ✅ ISR – 1 hour
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data.categories) ? data.categories : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default async function Home() {
  const categories: CategoryBackend[] = await getCategories();

  return <HomeClient categories={categories} />;
}
