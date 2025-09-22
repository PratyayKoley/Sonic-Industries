import { Request, Response } from "express";
import { OrderModel } from "../models/orders.model";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Product, ProductModel } from "../models/products.model";
import { DealModel } from "../models/deals.model";

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await OrderModel.find().populate("order_items.productId");

    if (!orders || orders.length === 0) {
      res.status(404).json({
        message: "No orders found.",
        items: [],
      });
      return;
    }

    res.status(200).json({
      message: "Orders found successfully.",
      items: orders,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const CheckoutSecret =
      process.env.JWT_CHECKOUT_SECRET ||
      "kbdhiffhibdsiujhaihhiBHBhvGUVguguGUYgutGFutf";
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

    const productInfo: Product | null = await ProductModel.findById(
      (decoded as { productId: string }).productId
    );

    if (!productInfo) {
      res.status(404).json({
        message: "Product associated with this session token not found.",
      });
      return;
    }

    // 🔁 Generate a unique order number: ORD-XXXXXXXXXX
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

    const total_price: number = productInfo.price * newOrderRequest.quantity;
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
        "order_items.productId": productInfo._id,
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

    // Add orderNumber and userId to the new order request
    const orderToSave = {
      orderNumber,
      sessionToken: newOrderRequest.sessionToken,
      customer: {
        firstName: newOrderRequest.customer.firstName,
        lastName: newOrderRequest.customer.lastName,
        email: newOrderRequest.customer.email,
        phone: newOrderRequest.customer.phone,
      },
      payment_method: "cod",
      total_price: total_price,
      discount: discount,
      final_price: total_price + shipping - discount,
      shipping_address: { ...newOrderRequest.customer.shippingAddress },
      billing_address: { ...newOrderRequest.customer.billingAddress },
      order_items: {
        productId: productInfo._id,
        categoryId: productInfo.categoryId,
        quantity: newOrderRequest.quantity,
        price: productInfo.price,
        name: productInfo.name,
      },
    };

    const newOrder = await OrderModel.create(orderToSave);

    res.status(200).json({
      message: "Order created successfully.",
      newOrder,
    });
  } catch (error) {
    console.error("Error creating orders:", error);
    res.status(500).json({ message: "Failed to create orders", error });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const allowedUpdates = ["status", "payment_status"];
    const updates: Partial<Record<string, any>> = {};

    if (!orderId) {
      res.status(400).json({ message: "Order ID is required." });
      return;
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found." });
      return;
    }

    // Filter only allowed fields
    for (const key of allowedUpdates) {
      if (req.body.hasOwnProperty(key)) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "No valid fields to update." });
      return;
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("order_items.productId");

    res.status(200).json({
      message: "Order updated successfully.",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      message: "Failed to update order.",
      error,
    });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json({
        message: "Order ID is required.",
      });
      return;
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({
        message: "Order not found.",
      });
      return;
    }

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    res.status(200).json({
      message: "Order deleted successfully.",
      deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      message: "Failed to delete order.",
      error,
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json({
        message: "Order ID is required.",
      });
      return;
    }

    const order = await OrderModel.findById(orderId).populate(
      "order_items.productId"
    );

    if (!order) {
      res.status(404).json({
        message: "Order not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Order fetched successfully.",
      order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({
      message: "Failed to fetch order.",
      error,
    });
  }
};
