import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const uploadInvoiceToCloudinary = async (
  pdfBuffer: Buffer,
  orderNumber: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // PDF = raw file
        folder: "Invoices",
        public_id: `Invoice-${orderNumber}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url as string);
      },
    );

    streamifier.createReadStream(pdfBuffer).pipe(stream);
  });
};
