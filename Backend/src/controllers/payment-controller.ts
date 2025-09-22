import { Request, Response } from "express";
import { razorpayInstance } from "../config/razorpay";
import { Product, ProductModel } from "../models/products.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { OrderModel } from "../models/orders.model";
import { DealModel } from "../models/deals.model";

const CheckoutSecret =
  process.env.JWT_CHECKOUT_SECRET ||
  "kbdhiffhibdsiujhaihhiBHBhvGUVguguGUYgutGFutf";

export const createRazorPayOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newOrderRequest = req.body;

    if (
      !newOrderRequest.sessionToken ||
      !newOrderRequest.payment_method ||
      !newOrderRequest.customer
    ) {
      res.status(400).json({
        message: "Insufficient order details.",
      });
      return;
    }

    const decoded = jwt.verify(newOrderRequest.sessionToken, CheckoutSecret);
    if (!decoded) {
      res.status(401).json({
        message: "Session expired or invalid",
      });
      return;
    }

    // fetch product securely from DB
    const product: Product | null = await ProductModel.findById(
      (decoded as { productId: string }).productId
    );

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    let orderNumber = "";
    let isUnique = false;

    while (!isUnique) {
      const suffix = uuidv4().replace(/-/g, "").slice(0, 10).toUpperCase();
      orderNumber = `ORD-${suffix}`;

      const existingOrder = await OrderModel.findOne({ orderNumber });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    const total_price: number = product.price * newOrderRequest.quantity;
    const couponCode: string = newOrderRequest.couponCode || null;

    let discount = 0;
    let shipping = 0;
    if (couponCode) {
      const deal = await DealModel.findOne({ couponCode });
      if (!deal) {
        res.status(404).json({
          message: "Invalid coupon code",
        });
        return;
      }

      const prevOrder = await OrderModel.findOne({
        couponCode: deal._id,
        "order_items.productId": product._id,
        "customer.email": newOrderRequest.customer.email,
      });
      if (prevOrder) {
        res.status(400).json({
          message: "You have already availed this offer",
        });
        return;
      }

      discount = deal.discountedPrice;
    }

    const orderToSave = {
      orderNumber,
      sessionToken: newOrderRequest.sessionToken,
      customer: {
        firstName: newOrderRequest.customer.firstName,
        lastName: newOrderRequest.customer.lastName,
        email: newOrderRequest.customer.email,
        phone: newOrderRequest.customer.phone,
      },
      payment_method: "razorpay",
      total_price: total_price,
      discount: discount,
      final_price: total_price + shipping - discount,
      shipping_address: { ...newOrderRequest.customer.shippingAddress },
      billing_address: { ...newOrderRequest.customer.billingAddress },
      order_items: {
        productId: product._id,
        categoryId: product.categoryId,
        quantity: newOrderRequest.quantity,
        price: product.price,
        name: product.name,
      },
    };

    const RazorpayOrder = await razorpayInstance.orders.create({
      amount: orderToSave.final_price * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
      notes: { productId: (decoded as { productId: string }).productId },
    });

    const newOrder = await OrderModel.create({
      ...orderToSave,
      razorpay: {
        razorpay_order_id: RazorpayOrder.id
      }
    });

    res.status(200).json({
      message: "Order created successfully in razorpay and db.",
      newOrder,
      RazorpayOrder,
      customerData: newOrderRequest.customer,
    });
  } catch (error) {
    console.error("Error creating orders:", error);
    res.status(500).json({ message: "Failed to create orders", error });
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { response } = req.body;
    if (
      !response.razorpay_order_id ||
      !response.razorpay_payment_id ||
      !response.razorpay_signature
    ) {
      res.status(400).json({
        message: "Invalid payment details",
      });
      return;
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
    const sign =
      response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature !== response.razorpay_signature) {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error,
    });
  }
};

export const createCheckoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({
        message: "Product not found. Wrong details provided",
      });
      return;
    }

    const nonce = crypto.randomBytes(8).toString("hex");
    const checkoutSessionToken = jwt.sign(
      {
        productId,
        nonce,
      },
      CheckoutSecret,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      message: "Success",
      checkoutSessionToken,
    });
  } catch (error) {
    console.error("Error creating checkout: ", error);
    res.status(500).json({
      message: "Failed to create checkout session",
      error,
    });
  }
};

export const verifyCheckoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessionToken } = req.body;

    const decoded = jwt.verify(sessionToken, CheckoutSecret) as {
      productId: string;
      nonce: string;
    };

    const product = await ProductModel.findById(decoded.productId).lean();
    if (!product) {
      res.status(404).json({
        message: "Product not found. Invalid session token",
      });
      return;
    }

    res.status(200).json({
      message: "Token verified successfully",
      product,
    });
  } catch (error) {
    console.error("Error verifying session: ", error);
    res.status(500).json({
      message: "Failed to verify session token",
      error,
    });
  }
};
