import { InferSchemaType, model, Schema, Types } from "mongoose";

const TestimonialSchema = new Schema(
  {
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export type Testimonial = InferSchemaType<typeof TestimonialSchema> & {
  _id: Types.ObjectId;
};

export const TestimonialModel = model<Testimonial>("Testimonial", TestimonialSchema);
