import { generateInvoicePdf } from "../config/invoicePdf";
import { Order, OrderModel } from "../models/orders.model";

export const generateReceiptBuffer = async (
  identifier: string,
): Promise<Buffer> => {
  const order: Order | null = await OrderModel.findOne({
    $or: [
      { "razorpay.razorpay_order_id": identifier },
      { orderNumber: identifier },
    ],
  }).populate("order_items.productId order_items.categoryId");

  if (!order) {
    throw new Error("Order not found");
  }

  const pdfDoc = await generateInvoicePdf(order);

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", reject);

    pdfDoc.end();
  });
};
