import { InferSchemaType, model, Schema, Types } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export type Cart = InferSchemaType<typeof CartSchema> & {
  _id: Types.ObjectId;
};

export const CartModel = model<Cart>("Cart", CartSchema);
