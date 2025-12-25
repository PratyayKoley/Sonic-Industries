import { InferSchemaType, model, Schema, Types } from "mongoose";

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    sessionToken: { type: String, required: true },
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      gstin: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    reward: {
      name: { type: String, default: null },
      spunAt: { type: Date, default: null },
    },
    spinEligible: {
      type: Boolean,
      default: false,
    },
    payment_method: {
      type: String,
      enum: ["cod", "razorpay"],
      required: true,
    },
    razorpay: {
      razorpay_order_id: { type: String, unique: true },
      razorpay_payment_id: { type: String },
      paidAt: { type: Date },
    },
    couponCode: { type: Types.ObjectId, ref: "Deal" },
    total_price: { type: Number, required: true },
    shipping_fee: { type: Number, required: true, default: 0 },
    prepaidDiscount: { type: Number, required: true, default: 0 },
    postpaidCharges: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    final_price: { type: Number, required: true },
    shipping_address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    billing_address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    order_items: {
      productId: { type: Types.ObjectId, ref: "Product", required: true },
      categoryId: { type: Types.ObjectId, ref: "Category", required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      name: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index(
  { "customer.email": 1, "order_items.productId": 1, couponCode: 1 },
  {
    unique: true,
    partialFilterExpression: { couponCode: { $exists: true, $ne: null } },
  }
);

export type Order = InferSchemaType<typeof OrderSchema> & {
  _id: Types.ObjectId;
};

export const OrderModel = model<Order>("Order", OrderSchema);
