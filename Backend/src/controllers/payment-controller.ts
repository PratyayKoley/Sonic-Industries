import { Request, Response } from "express";
import { razorpayInstance } from "../config/razorpay";
import { ProductModel } from "../models/products.model";

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
