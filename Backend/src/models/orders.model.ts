import { InferSchemaType, model, Schema, Types } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    orderNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["cod", "card", "upi"],
      default: "cod",
      required: true,
    },
    total_price: { type: Number, required: true },
    shipping_fee: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    final_price: { type: Number, required: true },
    shipping_address: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    order_items: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        categoryId: { type: Types.ObjectId, ref: "Category", required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export type Order = InferSchemaType<typeof OrderSchema> & {
  _id: Types.ObjectId;
};

export const OrderModel = model<Order>("Order", OrderSchema);
