import { Request, Response } from "express";
import cloudinary, { CloudinaryResult } from "../config/cloudinary";
import streamifier from "streamifier";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

const uploadToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<CloudinaryResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result!))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadMultipleImage = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: "No files uploaded" });
      return;
    }

    const { type, productName, categoryName } = req.body;
    let folder = "default";
    if (type === "product" && productName)
      folder = `products/${productName}/image`;
    else if (type === "deal") folder = `deals/image`;
    else if (type === "category" && categoryName)
      folder = `categories/${categoryName}/og_image`;

    const urls = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer, folder);
      urls.push({ url: result.secure_url, public_id: result.public_id });
    }

    res.json({ success: true, images: urls, message: "Images uploaded successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
