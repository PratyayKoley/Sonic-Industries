import { LeadModel } from "../models/leads.model";
import { OrderModel } from "../models/orders.model";
import { generateReceiptBuffer } from "../utils/generatePdfBuffer";
import { uploadInvoiceToCloudinary } from "../utils/uploadInvoiceToCloudinary";
import { getAdminEmailTemplate, getCustomerEmailTemplate } from "./Emails";
import { sendMail } from "./mailer";

export const handleSuccessfulOrderEmail = async (
  orderIdentifier: string,
  isCod = false,
): Promise<void> => {
  const query = isCod
    ? {
        orderNumber: orderIdentifier,
      }
    : {
        ["razorpay.razorpay_payment_id"]: orderIdentifier,
      };

  const order = await OrderModel.findOne(query);
  if (!order) {
    console.error("Order not found for:", orderIdentifier);
    return;
  }

  const existingLead = await LeadModel.findOne({
    subject: `Order Confirmation - ${order.orderNumber}`,
  });

  if (existingLead) return;

  await LeadModel.create({
    subject: `Order Confirmation - ${order.orderNumber}`,
    content: `Order ${order.orderNumber} confirmed successfully for ${order.customer?.firstName}.`,
    senderEmail: process.env.ADMIN_EMAILS?.split(",")[1] as string,
    senderName: "Sonic Industries",
    receiverEmail: order.customer?.email,
    receiverName: `${order.customer?.firstName} ${order.customer?.lastName}`,
    mailType: "order",
  });

  const receiptId = isCod
    ? order.orderNumber
    : order.razorpay?.razorpay_order_id;

  if (!receiptId) {
    console.error("Receipt ID not found for:", orderIdentifier);
    return;
  }

  console.log(receiptId);
  const pdfBuffer = await generateReceiptBuffer(receiptId);

  const invoiceUrl = await uploadInvoiceToCloudinary(
    pdfBuffer,
    order.orderNumber,
  );

  // send to customer
  await sendMail({
    to: order.customer?.email as string,
    subject: `Your Order ${order.orderNumber} is Confirmed!`,
    html: getCustomerEmailTemplate(order),
    attachments: [
      {
        filename: `Invoice-${order.orderNumber}.pdf`,
        content: pdfBuffer.toString("base64"),
      },
    ],
  });

  // send to admin
  await sendMail({
    to: process.env.ADMIN_EMAILS?.split(",") as string[],
    subject: `New Order Placed - ${order.orderNumber}`,
    html: getAdminEmailTemplate(order),
    attachments: [
      {
        filename: `Invoice-${order.orderNumber}.pdf`,
        content: pdfBuffer.toString("base64"),
      },
    ],
  });
};
