import { Schema, InferSchemaType, model, Types } from "mongoose";

const DealSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    mrp: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    rating: { type: Number, default: 5 },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type Deal = InferSchemaType<typeof DealSchema> & { _id: Types.ObjectId };

export const DealModel = model<Deal>("Deal", DealSchema);
