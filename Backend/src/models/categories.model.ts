import { Schema, model, InferSchemaType, Types } from "mongoose";

const FeaturesSchema = new Schema({
  image: { type: String },
  name: { type: String },
  desc: { type: String },
});

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },

    features: {
      desc1: { type: String },
      desc2: { type: String },
      items: [FeaturesSchema],
    },

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
