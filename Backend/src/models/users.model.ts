import { Schema, InferSchemaType, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
      required: true,
    },
    prof_image_url: {
      type: String,
      default:
        "https://res.cloudinary.com/dwnwqjf29/image/upload/v1747969997/default_user_it6znt.avif",
    },
    security_question: { type: String, required: true },
    security_answer: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };

export const UserModel = model<User>("User", UserSchema);
