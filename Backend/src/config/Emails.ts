import { Order } from "../models/orders.model";

export const getCustomerEmailTemplate = (order: any): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Order Confirmed!</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Thank you for your purchase</p>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px 30px 20px; text-align: center;">
              <div style="display: inline-block; width: 60px; height: 60px; background-color: #10b981; border-radius: 50%; line-height: 60px;">
                <span style="color: #ffffff; font-size: 32px;">✓</span>
              </div>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi <strong>${order.customer?.firstName} ${order.customer?.lastName}</strong>,
              </p>
              <p style="margin: 15px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                We've received your order and it's being processed. You'll receive another email once your items are on their way!
              </p>
            </td>
          </tr>
          
          <!-- Order Number -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                    <p style="margin: 8px 0 0; color: #111827; font-size: 20px; font-weight: 600;">${order.orderNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 18px; font-weight: 600;">Order Details</h2>
              
              <!-- Product Item -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #111827; font-size: 15px; font-weight: 600; padding-bottom: 8px;">
                          ${order.order_items?.name}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding-bottom: 15px;">
                          Quantity: ${order.order_items?.quantity}
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 5px 0;">Item Price</td>
                              <td style="color: #111827; font-size: 14px; text-align: right; padding: 5px 0;">₹${order.total_price?.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 5px 0;">Shipping Fee</td>
                              <td style="color: #111827; font-size: 14px; text-align: right; padding: 5px 0;">₹${order.shipping_fee?.toFixed(2)}</td>
                            </tr>
                            ${
                              order.discount > 0
                                ? `
                            <tr>
                              <td style="color: #10b981; font-size: 14px; padding: 5px 0;">Discount</td>
                              <td style="color: #10b981; font-size: 14px; text-align: right; padding: 5px 0;">-₹${order.discount?.toFixed(2)}</td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              order.prepaidDiscount > 0
                                ? `
                            <tr>
                              <td style="color: #10b981; font-size: 14px; padding: 5px 0;">Prepaid Discount</td>
                              <td style="color: #10b981; font-size: 14px; text-align: right; padding: 5px 0;">-₹${order.prepaidDiscount?.toFixed(2)}</td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              order.postpaidCharges > 0
                                ? `
                            <tr>
                              <td style="color: #ef4444; font-size: 14px; padding: 5px 0;">COD Charges</td>
                              <td style="color: #ef4444; font-size: 14px; text-align: right; padding: 5px 0;">+₹${order.postpaidCharges?.toFixed(2)}</td>
                            </tr>
                            `
                                : ""
                            }
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 10px 0 5px 0; border-top: 1px solid #e5e7eb;">Subtotal</td>
                              <td style="color: #111827; font-size: 14px; text-align: right; padding: 10px 0 5px 0; border-top: 1px solid #e5e7eb;">₹${order.final_price?.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 18px; font-weight: 700; padding-top: 10px; border-top: 2px solid #111827;">Total Amount</td>
                              <td style="color: #111827; font-size: 18px; font-weight: 700; text-align: right; padding-top: 10px; border-top: 2px solid #111827;">₹${order.final_price?.toFixed(2)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Payment & Shipping Info -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="48%" style="vertical-align: top; padding-right: 2%;">
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Method</p>
                      <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 500;">${order.payment_method === "cod" ? "Cash on Delivery" : order.payment_method === "razorpay" ? "Razorpay" : "Online Payment"}</p>
                      <p style="margin: 5px 0 0; color: ${order.payment_status === "paid" ? "#10b981" : "#f59e0b"}; font-size: 13px; font-weight: 600; text-transform: uppercase;">${order.payment_status}</p>
                    </div>
                  </td>
                  <td width="48%" style="vertical-align: top; padding-left: 2%;">
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Address</p>
                        <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 500;">
                            ${
                              [
                                order.shipping_address?.address,
                                order.shipping_address?.city,
                                order.shipping_address?.state,
                                order.shipping_address?.postalCode,
                                order.shipping_address?.country,
                              ]
                                .filter(Boolean)
                                .join(", ") || "As provided"
                            }
                        </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
                Questions about your order? Contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #667eea; text-decoration: none;">${process.env.EMAIL_USER}</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 13px; text-align: center;">
                © ${new Date().getFullYear()} Sonic Industries. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Admin Email Template
export const getAdminEmailTemplate = (order: Order): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="650" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); padding: 35px 30px; border-radius: 8px 8px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600;">🔔 New Order Received</h1>
                    <p style="margin: 8px 0 0; color: #ffffff; font-size: 15px; opacity: 0.95;">Order #${order.orderNumber}</p>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <div style="background-color: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block;">
                      <span style="color: #ffffff; font-size: 13px; font-weight: 600;">${new Date().toLocaleString()}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Quick Stats -->
          <tr>
            <td style="padding: 30px 30px 25px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="25%" style="text-align: center; padding: 20px 10px; background-color: #ecfdf5; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #059669; font-size: 22px; font-weight: 700;">₹${order.final_price?.toFixed(2)}</p>
                    <p style="margin: 0; color: #10b981; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Final Amount</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 20px 10px; background-color: #eff6ff; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #2563eb; font-size: 22px; font-weight: 700;">${order.order_items?.quantity}</p>
                    <p style="margin: 0; color: #3b82f6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Items</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 20px 10px; background-color: #fef3c7; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #d97706; font-size: 14px; font-weight: 700;">${order.payment_method.toUpperCase()}</p>
                    <p style="margin: 0; color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Payment</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 20px 10px; background-color: ${order.payment_status === "paid" ? "#ecfdf5" : "#fef3c7"}; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: ${order.payment_status === "paid" ? "#059669" : "#d97706"}; font-size: 14px; font-weight: 700;">${order.payment_status.toUpperCase()}</p>
                    <p style="margin: 0; color: ${order.payment_status === "paid" ? "#10b981" : "#f59e0b"}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Status</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Customer Information -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600;">Customer Information</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Customer Name</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">${order.customer?.firstName} ${order.customer?.lastName}</p>
                        </td>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Email Address</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;"><a href="mailto:${order.customer?.email}" style="color: #2563eb; text-decoration: none;">${order.customer?.email}</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Phone Number</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">${order.customer?.phone || "N/A"}</p>
                        </td>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Order ID</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">${order._id}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Shipping Address</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">
                            ${
                              [
                                order.shipping_address?.address,
                                order.shipping_address?.city,
                                order.shipping_address?.state,
                                order.shipping_address?.postalCode,
                                order.shipping_address?.country,
                              ]
                                .filter(Boolean)
                                .join(", ") || "As provided"
                            }
                        </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Items & Payment Breakdown -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600;">Order Items & Payment Details</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Product</td>
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; text-align: center; border-bottom: 1px solid #e5e7eb;">Quantity</td>
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</td>
                </tr>
                <tr>
                  <td style="padding: 20px; color: #111827; font-size: 15px; font-weight: 500;">${order.order_items?.name}</td>
                  <td style="padding: 20px; color: #111827; font-size: 15px; text-align: center;">${order.order_items?.quantity}</td>
                  <td style="padding: 20px; color: #111827; font-size: 15px; font-weight: 600; text-align: right;">₹${order.total_price?.toFixed(2)}</td>
                </tr>
                
                <!-- Payment Breakdown -->
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Item Subtotal</td>
                  <td style="padding: 12px 20px; color: #111827; font-size: 14px; text-align: right; border-top: 1px solid #e5e7eb;">₹${order.total_price?.toFixed(2)}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #6b7280; font-size: 14px;">Shipping Fee</td>
                  <td style="padding: 12px 20px; color: #111827; font-size: 14px; text-align: right;">₹${order.shipping_fee?.toFixed(2)}</td>
                </tr>
                ${
                  order.discount > 0
                    ? `
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #10b981; font-size: 14px;">Discount Applied</td>
                  <td style="padding: 12px 20px; color: #10b981; font-size: 14px; text-align: right;">-₹${order.discount?.toFixed(2)}</td>
                </tr>
                `
                    : ""
                }
                ${
                  order.prepaidDiscount > 0
                    ? `
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #10b981; font-size: 14px;">Prepaid Discount</td>
                  <td style="padding: 12px 20px; color: #10b981; font-size: 14px; text-align: right;">-₹${order.prepaidDiscount?.toFixed(2)}</td>
                </tr>
                `
                    : ""
                }
                ${
                  order.postpaidCharges > 0
                    ? `
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #ef4444; font-size: 14px;">COD Charges</td>
                  <td style="padding: 12px 20px; color: #ef4444; font-size: 14px; text-align: right;">+₹${order.postpaidCharges?.toFixed(2)}</td>
                </tr>
                `
                    : ""
                }
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 12px 20px; color: #6b7280; font-size: 15px; font-weight: 600; border-top: 1px solid #e5e7eb;">Subtotal (Before Adjustments)</td>
                  <td style="padding: 12px 20px; color: #111827; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #e5e7eb;">₹${order.final_price?.toFixed(2)}</td>
                </tr>
                <tr style="background-color: #ecfdf5;">
                  <td colspan="2" style="padding: 15px 20px; color: #111827; font-size: 17px; font-weight: 700; border-top: 2px solid #059669;">Final Order Total</td>
                  <td style="padding: 15px 20px; color: #059669; font-size: 19px; font-weight: 700; text-align: right; border-top: 2px solid #059669;">₹${order.final_price?.toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Action Required -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px; color: #92400e; font-size: 15px; font-weight: 600;">⚡ Action Required</p>
                <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.6;">Please process this order and prepare it for shipment. Update the order status in the admin panel.</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                This is an automated notification from your order management system.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Sonic Industries Admin Panel
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Inquiry Email Template for Admin
export const getInquiryEmailTemplate = (
  senderName: string,
  email: string,
  message: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="650" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 35px 30px; border-radius: 8px 8px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600;">💬 New Inquiry Received</h1>
                    <p style="margin: 8px 0 0; color: #ffffff; font-size: 15px; opacity: 0.95;">Someone has reached out to you</p>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <div style="background-color: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block;">
                      <span style="color: #ffffff; font-size: 13px; font-weight: 600;">${new Date().toLocaleString()}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Sender Information -->
          <tr>
            <td style="padding: 30px 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600;">Sender Information</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Name</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">${senderName}</p>
                        </td>
                        <td width="50%" style="padding: 10px 0; vertical-align: top;">
                          <p style="margin: 0 0 5px; color: #6b7280; font-size: 13px;">Email Address</p>
                          <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message Content -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600;">Message</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 25px; background-color: #ffffff;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Quick Action -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your Inquiry" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 15px; font-weight: 600;">Reply to ${senderName}</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                This is an automated notification from your inquiry system.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Sonic Industries Admin Panel
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const getOtpEmailTemplate = (otp: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Verify Your Email</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Your verification code is ready</p>
            </td>
          </tr>
          
          <!-- Security Icon -->
          <tr>
            <td style="padding: 30px 30px 20px; text-align: center;">
              <div style="display: inline-block; width: 60px; height: 60px; background-color: #667eea; border-radius: 50%; line-height: 60px;">
                <span style="color: #ffffff; font-size: 32px;">🔐</span>
              </div>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; text-align: center;">
                We received a request to verify your email address. Use the code below to complete your verification.
              </p>
            </td>
          </tr>
          
          <!-- OTP Code -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Your Verification Code</p>
                    <p style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Expiry Warning -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>⏰ Important:</strong> This code will expire in <strong>10 minutes</strong>. Don't share this code with anyone.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Additional Info -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      If you didn't request this verification code, you can safely ignore this email. Someone may have typed your email address by mistake.
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      For security reasons, never share your verification codes with anyone, including Sonic Industries staff.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
                Need help? Contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #667eea; text-decoration: none;">${process.env.EMAIL_USER}</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 13px; text-align: center;">
                © ${new Date().getFullYear()} Sonic Industries. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Customer Rewards Email Template
export const getCustomerRewardsEmailTemplate = (order: Order): string => {
  const customerName = `${order.customer?.firstName} ${order.customer?.lastName}`;
  const rewardItem = order.reward?.name || "Mystery Gift";
  const orderNumber = order.orderNumber;
  const orderValue = order.final_price;

  // Map reward items to their image URLs
  const rewardImages: { [key: string]: string } = {
    Perfume: `${process.env.FRONTEND_URL || ""}/perfume.avif`,
    Smartwatch: `${process.env.FRONTEND_URL || ""}/smartwatch.avif`,
    Earbuds: `${process.env.FRONTEND_URL || ""}/earbuds.webp`,
    Neckband: `${process.env.FRONTEND_URL || ""}/neckband.webp`,
    Headphones: `${process.env.FRONTEND_URL || ""}/headphones.jpg`,
  };

  const rewardImageUrl =
    rewardImages[rewardItem] ||
    `${process.env.FRONTEND_URL || ""}/images/rewards/default.jpg`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reward Assigned!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🎉 Congratulations!</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">You've earned an exclusive reward</p>
            </td>
          </tr>
          
          <!-- Reward Image -->
          <tr>
            <td style="padding: 30px 30px 20px; text-align: center;">
              <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; overflow: hidden; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4); border: 4px solid #fbbf24; background-color: #ffffff;">
                <img src="${rewardImageUrl}" alt="${rewardItem}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
              </div>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; text-align: center;">
                Hi <strong>${customerName}</strong>,
              </p>
              <p style="margin: 15px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6; text-align: center;">
                Amazing news! Based on your recent purchase, you've been selected to receive an exclusive reward. This is our way of saying thank you for your loyalty!
              </p>
            </td>
          </tr>
          
          <!-- Reward Item Card -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #fbbf24; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);">
                <tr>
                  <td style="padding: 35px; text-align: center;">
                    <p style="margin: 0 0 15px; color: #92400e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Reward</p>
                    <p style="margin: 0; color: #b45309; font-size: 42px; font-weight: 700; line-height: 1.2;">${rewardItem}</p>
                    <div style="margin: 20px 0 0; padding: 15px; background-color: rgba(255, 255, 255, 0.6); border-radius: 8px; display: inline-block;">
                      <p style="margin: 0; color: #92400e; font-size: 13px;">🎊 <strong>FREE GIFT</strong> 🎊</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="48%" style="vertical-align: top; padding-right: 2%;">
                    <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border: 2px solid #10b981; text-align: center;">
                      <p style="margin: 0 0 8px; color: #065f46; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order Number</p>
                      <p style="margin: 0; color: #059669; font-size: 18px; font-weight: 700;">${orderNumber}</p>
                    </div>
                  </td>
                  <td width="48%" style="vertical-align: top; padding-left: 2%;">
                    <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 2px solid #3b82f6; text-align: center;">
                      <p style="margin: 0 0 8px; color: #1e40af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order Value</p>
                      <p style="margin: 0; color: #2563eb; font-size: 18px; font-weight: 700;">₹${orderValue.toFixed(2)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What Happens Next -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600; text-align: center;">What Happens Next?</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                <tr>
                  <td style="padding: 25px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; color: #ffffff; font-weight: 700; font-size: 14px;">1</span>
                          <div style="display: inline-block; vertical-align: top; width: calc(100% - 50px);">
                            <p style="margin: 0 0 5px; color: #111827; font-size: 14px; font-weight: 600;">Reward Confirmed</p>
                            <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">Your ${rewardItem} has been assigned to this order</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 32px; height: 32px; background-color: #3b82f6; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; color: #ffffff; font-weight: 700; font-size: 14px;">2</span>
                          <div style="display: inline-block; vertical-align: top; width: calc(100% - 50px);">
                            <p style="margin: 0 0 5px; color: #111827; font-size: 14px; font-weight: 600;">Shipped Together</p>
                            <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">Your reward will be packed with your order</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 32px; height: 32px; background-color: #f59e0b; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; color: #ffffff; font-weight: 700; font-size: 14px;">3</span>
                          <div style="display: inline-block; vertical-align: top; width: calc(100% - 50px);">
                            <p style="margin: 0 0 5px; color: #111827; font-size: 14px; font-weight: 600;">Enjoy Your Gift</p>
                            <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">Delivered to your doorstep at no extra cost</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Thank You Message -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6; font-weight: 500;">
                  ✨ Thank you for being a valued customer! We hope you love your ${rewardItem}! ✨
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
                Questions about your reward? Contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #f59e0b; text-decoration: none;">${process.env.EMAIL_USER}</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 13px; text-align: center;">
                © ${new Date().getFullYear()} Sonic Industries. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Admin Rewards Email Template
export const getAdminRewardsEmailTemplate = (order: Order): string => {
  const customerName = `${order.customer?.firstName} ${order.customer?.lastName}`;
  const customerEmail = order.customer?.email;
  const customerPhone = order.customer?.phone;

  const rewardItem = order.reward?.name || "Mystery Gift";
  const spunAt = order.reward?.spunAt
    ? new Date(order.reward.spunAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      })
    : "N/A";

  const orderNumber = order.orderNumber;
  const orderStatus = order.status.toUpperCase();
  const paymentStatus = order.payment_status.toUpperCase();
  const finalPrice = order.final_price;

  const shippingAddress = `${order.shipping_address?.firstName} ${order.shipping_address?.lastName}, ${order.shipping_address?.address}, ${order.shipping_address?.city}, ${order.shipping_address?.state} - ${order.shipping_address?.postalCode}`;

  const productName = order.order_items?.name;

  const statusColors: { [key: string]: string } = {
    PENDING: "#f59e0b",
    SHIPPED: "#3b82f6",
    DELIVERED: "#10b981",
    CANCELLED: "#ef4444",
  };

  const paymentStatusColors: { [key: string]: string } = {
    PENDING: "#f59e0b",
    PAID: "#10b981",
    FAILED: "#ef4444",
    REFUNDED: "#6b7280",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin: Reward Assigned - Order #${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="650" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; text-align: center;">🎁 REWARD ASSIGNED</h1>
              <p style="margin: 8px 0 0; color: #cbd5e1; font-size: 14px; text-align: center;">Order #${orderNumber}</p>
            </td>
          </tr>
          
          <!-- Alert Banner -->
          <tr>
            <td style="padding: 25px 30px 20px;">
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 18px 20px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6; font-weight: 600;">
                  ⚠️ Pack <strong style="font-size: 16px;">${rewardItem}</strong> with this order before shipment
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Reward & Order Info Card -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 8px;">
                <tr>
                  <td style="padding: 25px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #fbbf24;">
                          <p style="margin: 0 0 8px; color: #92400e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Reward Item</p>
                          <p style="margin: 0; color: #b45309; font-size: 28px; font-weight: 700;">${rewardItem}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 15px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="50%" style="padding: 5px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 12px; font-weight: 600;">Spun At</p>
                                <p style="margin: 3px 0 0; color: #b45309; font-size: 13px;">${spunAt}</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; text-align: right;">
                                <p style="margin: 0; color: #92400e; font-size: 12px; font-weight: 600;">Order Value</p>
                                <p style="margin: 3px 0 0; color: #b45309; font-size: 13px; font-weight: 700;">₹${finalPrice.toFixed(2)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order & Customer Details -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <h2 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 700;">📦 ORDER & CUSTOMER DETAILS</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="50%" style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Customer</p>
                          <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">${customerName}</p>
                        </td>
                        <td width="50%" style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Product</p>
                          <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 500;">${productName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Email</p>
                          <p style="margin: 0; color: #2563eb; font-size: 13px;"><a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: none;">${customerEmail}</a></p>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Phone</p>
                          <p style="margin: 0; color: #111827; font-size: 13px;">${customerPhone}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 12px 0 0; vertical-align: top; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Shipping Address</p>
                          <p style="margin: 0; color: #111827; font-size: 13px; line-height: 1.5;">${shippingAddress}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Order Status</p>
                          <p style="margin: 0; color: ${statusColors[orderStatus] || "#6b7280"}; font-size: 13px; font-weight: 600;">${orderStatus}</p>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase;">Payment Status</p>
                          <p style="margin: 0; color: ${paymentStatusColors[paymentStatus] || "#6b7280"}; font-size: 13px; font-weight: 600;">${paymentStatus}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px; text-align: center;">
                Automated notification from Sonic Industries Order System
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Sonic Industries. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
