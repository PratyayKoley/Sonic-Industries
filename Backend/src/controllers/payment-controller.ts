import { Request, Response } from "express";
import { razorpayInstance } from "../config/razorpay";
import { ProductModel } from "../models/products.model";
import crypto from "crypto";

export const createRazorPayOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, customer } = req.body;

    // fetch product securely from DB
    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    const order = await razorpayInstance.orders.create({
      amount: product.price * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
      notes: { productId },
    });

    res.status(201).json({
      message: "Razorpay order created successfully",
      order,
      customer,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create order", error });
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
