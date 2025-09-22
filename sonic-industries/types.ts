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

  features?: CategoryFeatures[];

  labels?: CategoryLabels[];

  yt_video_url?: string;

  packaged?: CategoryPackaged;

  createdAt?: string;
  updatedAt?: string;
}

export interface DealBackend {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  mrp: number;
  discountedPrice: number;
  couponCode: string;
  rating?: number;
  expiresAt: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadBackend {
  _id: string;
  subject: string;
  content: string;
  senderEmail: string;
  senderName?: string;
  receiverEmail: string;
  receiverName?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  status: "new" | "in-progress" | "replied" | "closed";
}

export interface OrderModelBackend {
  _id: string;
  orderNumber: string;
  sessionToken: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  status: "pending" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_method: "cod" | "razorpay";
  razorpay?: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    paidAt?: Date;
  };
  couponCode?: string;
  total_price: number;
  shipping_fee: number;
  discount: number;
  final_price: number;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billing_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  order_items: {
    productId: string;
    categoryId: string;
    quantity: number;
    price: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFeatures {
  image?: string;
  name?: string;
  desc?: string;
}

export interface CategoryLabels {
  x?: number;
  y?: number;
  name?: string;
  desc?: string;
}

export interface PackagedItems {
  name?: string;
  desc?: string;
}

export interface CategoryPackaged {
  items?: PackagedItems[];
  length: number;
  width: number;
  height: number;
}

export type SearchAllCategoryProps = {
  categories: CategoryBackend[];
  startEdit: (category: CategoryBackend) => void;
  handleDelete: (id: string) => void;
};

export type SearchBySlugProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  startEdit: (category: CategoryBackend) => void;
  handleDelete: (id: string) => void;
};

export type FormDataType = {
  name: string;
  slug: string;
  description: string;
  features: CategoryFeatures[];
  labels: CategoryLabels[];
  yt_video_url: string;
  packaged: CategoryPackaged[];
};

export type EditingModalProps = {
  selectedCategory: CategoryBackend | null;
  setSelectedCategory: (category: CategoryBackend | null) => void;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  categories: CategoryBackend[];
  setCategories: (categories: CategoryBackend[]) => void;
};

export type CreateCategoryProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  categories: CategoryBackend[];
  setCategories: (categories: CategoryBackend[]) => void;
  setActiveTab: (activeTab: "browse" | "search" | "create") => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedCategory: (category: CategoryBackend | null) => void;
  setActiveFormTab: (tab: FormTab) => void;
  activeFormTab: FormTab;
};

export type ProductFeatures = {
  name?: string;
  weight?: number;
};

export type ProductPackaged = {
  length: number;
  width: number;
  height: number;
};

export type ProductFormDataType = {
  name: string;
  slug: string;
  description: string;
  tagline: string;

  categoryId: string;

  price: number;
  mrp: number;
  stock: number;
  images: string[];
  rating: number;
  num_reviews: number;
  sku: string;

  size: string;
  color: string;
  material: string;
  countryOfOrigin: string;
  hsnCode: string;

  features: ProductFeatures[];

  packaging: ProductPackaged;

  yt_video_url: string;
};

export type ProductSearchBySlugProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  startEdit: (category: ProductBackend) => void;
  handleDelete: (id: string) => void;
};

export type CreateProductProps = {
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setProducts: (products: ProductBackend[]) => void;
  setSuccess: (message: string) => void;
  setActiveTab: (activeTab: "browse" | "search" | "create") => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedProduct: (product: ProductBackend | null) => void;
  activeFormTab: ProductFormTab;
  setActiveFormTab: (tab: ProductFormTab) => void;
  products: ProductBackend[];
  categories: CategoryBackend[];
};

export type SearchAllProductProps = {
  categories: CategoryBackend[];
  products: ProductBackend[];
  startEdit: (product: ProductBackend) => void;
  handleDelete: (id: string) => void;
};

export type ProductEditingModalProps = {
  selectedProduct: ProductBackend | null;
  setSelectedProduct: (product: ProductBackend | null) => void;
  formData: ProductFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  products: ProductBackend[];
  setProducts: (products: ProductBackend[]) => void;
};

export type DealFormDataType = {
  title: string;
  description: string;
  imageUrl: string;
  mrp: number;
  discountedPrice: number;
  rating: number;
  expiresAt: string; // ISO date string
};

export type DealEditingModalProps = {
  selectedDeal: DealBackend | null;
  setSelectedDeal: (product: DealBackend | null) => void;
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  deals: DealBackend[];
  setDeals: (products: DealBackend[]) => void;
};

export type SearchAllDealProps = {
  deals: DealBackend[];
  startEdit: (deal: DealBackend) => void;
  handleDelete: (id: string) => void;
};

export type CreateDealProps = {
  formData: DealFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<DealFormDataType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  deals: DealBackend[];
  setDeals: (deals: DealBackend[]) => void;
  setActiveTab: (activeTab: "browse" | "create") => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedDeal: (deal: DealBackend | null) => void;
  setActiveFormTab: (tab: DealFormTab) => void;
  activeFormTab: DealFormTab;
};

export interface OrdersDashboardProps {
  order: OrderModelBackend;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string, payment_status: string) => void;
  onDelete: (id: string) => void;
}

export type DealFormTab = "basic" | "pricing" | "image-rating";
export type FormTab = "basic" | "features" | "labels" | "video" | "packaging";
export type ProductFormTab =
  | "basic"
  | "features"
  | "details"
  | "video"
  | "packaging"
  | "pricing";

export interface RazorpayPaymentOrder {
  order: {
    amount: number;
    amount_due: number;
    amount_paid: number;
    attempts: number;
    created_at: number;
    currency: string;
    entity: string;
    id: string;
    notes: {
      productId: string;
    };
    offer_id: string | null;
    receipt: string;
    status: string;
  };
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentFailedResponse {
  error: {
    code: string;
    description: string;
    field: any;
    source: string;
    step: string;
    reason: string;
    metadata: {
      payment_id: string;
      order_id: string;
    };
  };
}
