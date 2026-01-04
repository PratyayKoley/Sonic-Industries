import { InferSchemaType, model, Schema, Types } from "mongoose";

const OTPStoreSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    sessionId: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

OTPStoreSchema.index({ sessionId: 1 }, { unique: true });
OTPStoreSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type OTPStore = InferSchemaType<typeof OTPStoreSchema> & {
  _id: Types.ObjectId;
};

export const OTPStoreModel = model<OTPStore>("OTPStore", OTPStoreSchema);
