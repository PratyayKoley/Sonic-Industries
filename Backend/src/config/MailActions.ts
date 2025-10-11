import { LeadModel } from "../models/leads.model";
import { OrderModel } from "../models/orders.model";
import { getAdminEmailTemplate, getCustomerEmailTemplate } from "./Emails";
import { sendMail } from "./mailer";

export const handleSuccessfulOrderEmail = async (
  orderIdentifier: string,
  isCod = false
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

  const customerHtml = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>🎉 Order Confirmed!</h2>
    <p>Hi ${order.customer?.firstName} ${order.customer?.lastName},</p>
    <p>Thank you for your order <b>${order.orderNumber}</b>.</p>
    <p>Details:</p>
    <ul>
      <li>Product: ${order.order_items?.name}</li>
      <li>Quantity: ${order.order_items?.quantity}</li>
      <li>Total Price: ₹${order.order_items?.price}</li>
      <li>Payment Method: ${order.payment_method}</li>
    </ul>
    <p>We will notify you once your order is shipped.</p>
    <p>Regards,<br/>Sonic Industries</p>
  </div>
`;

  await LeadModel.create({
    subject: `Order Confirmation - ${order.orderNumber}`,
    content: `Order ${order.orderNumber} confirmed successfully for ${order.customer?.firstName}.`,
    senderEmail: process.env.EMAIL_USER as string,
    senderName: "Sonic Industries",
    receiverEmail: order.customer?.email,
    receiverName: `${order.customer?.firstName} ${order.customer?.lastName}`,
    mailType: "order",
  });

  await sendMail({
    to: order.customer?.email as string,
    subject: `Your Order ${order.orderNumber} is Confirmed!`,
    html: getCustomerEmailTemplate(order),
  });

  await sendMail({
    to: process.env.EMAIL_USER as string,
    subject: `New Order Placed - ${order.orderNumber}`,
    html: getAdminEmailTemplate(order), 
  });
};
