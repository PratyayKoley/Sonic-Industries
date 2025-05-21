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
