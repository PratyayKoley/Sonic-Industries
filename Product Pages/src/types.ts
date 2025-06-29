import { JSX } from "react";

export interface Feature {
  title: string;
  icon: JSX.Element;
  description: string;
  animation: "left" | "right" | "bottom";
}

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export interface Hotspot {
  id: number;
  x: number;
  y?: number;
  title?: string;
  description?: string;
  color?: string;
  lineColor?: string;
  icon?: JSX.Element;
}

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  price: string;
  brand: string;
  color: string;
  compatibility: string;
  dimensions: string;
  weight: string;
  os: string;
  battery: string;
};

export type Specification = {
  id: keyof Product;
  name: string;
};

export type SpecRowProps = {
  spec: Specification;
  index: number;
};

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ProductBackend {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  tagline?: string;

  categoryId: string;

  price: number;
  mrp?: number;
  stock: number;
  images: string[];
  rating: number;
  num_reviews: number;
  sku?: string;

  size?: string;
  color?: string;
  material?: string;
  countryOfOrigin?: string;
  hsnCode?: string;

  features?: {
    name?: string;
    weight?: number;
  }[];

  packaging?: {
    items?: number;
    length?: number;
    width?: number;
    height?: number;
  };

  yt_video_url?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryBackend {
  _id: string;
  name: string;
  slug: string;
  description?: string;

  features?: {
    image?: string;
    name?: string;
    desc?: string;
  }[];

  labels?: {
    x?: number;
    y?: number;
    name?: string;
    desc?: string;
  }[];

  yt_video_url?: string;

  packaged?: {
    items?: {
      name?: string;
      desc?: string;
    }[];
    length: number;
    width: number;
    height: number;
  }[];

  createdAt?: string;
  updatedAt?: string;
}
