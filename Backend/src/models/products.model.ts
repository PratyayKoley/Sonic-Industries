import { Schema, InferSchemaType, model, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    tagline: { type: String },

    categoryId: { type: Types.ObjectId, ref: "Category", required: true },

    price: { type: Number, required: true },
    mrp: { type: Number }, // MRP (original)
    stock: { type: Number, required: true },
    images: [{ type: String }], // image URLs
    rating: { type: Number, default: 0, min: 0, max: 5 },
    num_reviews: { type: Number, default: 0 },
    sku: { type: String },

    size: { type: String },
    color: { type: String },
    material: { type: String },
    countryOfOrigin: { type: String },
    hsnCode: { type: String },

    features: [
      {
        name: { type: String },
        weight: { type: Number },
      },
    ],

    packaging: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },

    yt_video_url: { type: String },
  },
  {
    timestamps: true,
  },
);

export type Product = InferSchemaType<typeof ProductSchema> & {
  _id: Types.ObjectId;
};

export const ProductModel = model<Product>("Product", ProductSchema);