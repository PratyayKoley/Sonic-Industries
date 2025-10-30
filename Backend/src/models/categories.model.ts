import { Schema, model, InferSchemaType, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },

    features: [
      {
        image: { type: String },
        name: { type: String },
        desc: { type: String },
      },
    ],

    labels: [
      {
        x: { type: Number },
        y: { type: Number },
        name: { type: String },
        desc: { type: String },
      },
    ],

    yt_video_url: { type: String },
  },
  {
    timestamps: true,
  }
);

export type Category = InferSchemaType<typeof CategorySchema> & {
  _id: Types.ObjectId;
};

export const CategoryModel = model<Category>("Category", CategorySchema);
