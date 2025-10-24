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
                              <td style="color: #6b7280; font-size: 14px;">Subtotal</td>
                              <td style="color: #111827; font-size: 14px; text-align: right;">₹${order.order_items?.price}</td>
                            </tr>
                            <tr>
                              <td style="color: #111827; font-size: 16px; font-weight: 600; padding-top: 10px;">Total</td>
                              <td style="color: #111827; font-size: 16px; font-weight: 600; text-align: right; padding-top: 10px;">₹${order.order_items?.price}</td>
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
                      <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 500;">${order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
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
export const getAdminEmailTemplate = (order: any): string => {
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
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #ecfdf5; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #059669; font-size: 24px; font-weight: 700;">₹${order.order_items?.price}</p>
                    <p style="margin: 0; color: #10b981; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Total Value</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #eff6ff; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #2563eb; font-size: 24px; font-weight: 700;">${order.order_items?.quantity}</p>
                    <p style="margin: 0; color: #3b82f6; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Items</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 20px; background-color: #fef3c7; border-radius: 6px;">
                    <p style="margin: 0 0 5px; color: #d97706; font-size: 16px; font-weight: 700;">${order.payment_method}</p>
                    <p style="margin: 0; color: #f59e0b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Payment</p>
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
          
          <!-- Order Items -->
          <tr>
            <td style="padding: 0 30px 25px;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px; font-weight: 600;">Order Items</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; border-bottom: 1px solid #e5e7eb;">Product</td>
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; text-align: center; border-bottom: 1px solid #e5e7eb;">Quantity</td>
                  <td style="padding: 12px 20px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</td>
                </tr>
                <tr>
                  <td style="padding: 20px; color: #111827; font-size: 15px; font-weight: 500;">${order.order_items?.name}</td>
                  <td style="padding: 20px; color: #111827; font-size: 15px; text-align: center;">${order.order_items?.quantity}</td>
                  <td style="padding: 20px; color: #111827; font-size: 15px; font-weight: 600; text-align: right;">₹${order.order_items?.price}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td colspan="2" style="padding: 15px 20px; color: #111827; font-size: 16px; font-weight: 600; border-top: 1px solid #e5e7eb;">Order Total</td>
                  <td style="padding: 15px 20px; color: #059669; font-size: 18px; font-weight: 700; text-align: right; border-top: 1px solid #e5e7eb;">₹${order.order_items?.price}</td>
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
export const getInquiryEmailTemplate = (senderName: string, email: string, message: string) => {
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
