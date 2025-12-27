import { InferSchemaType, model, Schema, Types } from "mongoose";

const OTPStoreSchema = new Schema(
  {
    email: { type: String, required: true, index: true, trim: true },
    sessionId: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    attempts: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

OTPStoreSchema.index({ sessionId: 1 }, { unique: true });

export type OTPStore = InferSchemaType<typeof OTPStoreSchema> & {
  _id: Types.ObjectId;
};

export const OTPStoreModel = model<OTPStore>("OTPStore", OTPStoreSchema);
