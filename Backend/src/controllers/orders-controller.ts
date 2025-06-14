import { Request, Response } from "express";
import { Order, OrderModel } from "../models/orders.model";
import { v4 as uuidv4 } from "uuid";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const orders = await OrderModel.find({ userId }).populate(
      "order_items.productId"
    );

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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const newOrderRequest: Order = req.body;

    if (
      !newOrderRequest ||
      !newOrderRequest.order_items ||
      !Array.isArray(newOrderRequest.order_items) ||
      newOrderRequest.order_items.length === 0
    ) {
      res.status(400).json({
        message: "Order Items are required.",
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

    // Add orderNumber and userId to the new order request
    const orderToSave = {
      ...newOrderRequest,
      userId,
      orderNumber,
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
    const userId = req.user?.userId;
    const allowedUpdates = ["status", "payment_status", "payment_method"];
    const updates: Partial<Record<string, any>> = {};

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!orderId) {
      res.status(400).json({ message: "Order ID is required." });
      return;
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found." });
      return;
    }

    if (order.userId.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this order." });
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
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

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

    if (order.userId.toString() !== userId) {
      res.status(403).json({
        message: "You are not authorized to delete this order.",
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