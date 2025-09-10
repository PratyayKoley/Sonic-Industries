import { InferSchemaType, model, Schema, Types } from "mongoose";

const LeadSchema = new Schema(
  {
    subject: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    senderEmail: { type: String, required: true, index: true },
    senderName: { type: String, trim: true },
    receiverEmail: { type: String, required: true, index: true },
    receiverName: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "in-progress", "replied", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export type Lead = InferSchemaType<typeof LeadSchema> & {
  _id: Types.ObjectId;
};

export const LeadModel = model<Lead>("Lead", LeadSchema);
