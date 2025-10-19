import { Schema, InferSchemaType, model, Types } from "mongoose";
interface DealDoc {
  dealType: "general" | "product";
  mrp?: number;
  discountedPrice?: number;
}

const DealSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dealType: { type: String, enum: ["general", "product"], required: true },
    imageUrl: { type: String, required: true },
    mrp: {
      type: Number,
      required: function (this: DealDoc) {
        return this.dealType === "product";
      },
    },
    discountPercent: {
      type: Number,
      required: function (this: DealDoc) {
        return this.dealType === "product";
      },
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: function (this: DealDoc) {
        return this.dealType === "product";
      },
    },
    rating: { type: Number, default: 5 },
    expiresAt: { type: Date, required: true },
    couponCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export type Deal = InferSchemaType<typeof DealSchema> & { _id: Types.ObjectId };

export const DealModel = model<Deal>("Deal", DealSchema);
