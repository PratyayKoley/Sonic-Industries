// controllers/adminDashboard.controller.ts
import { ProductModel } from "../models/products.model";
import { OrderModel } from "../models/orders.model";
import { LeadModel } from "../models/leads.model";
import { Request, Response } from "express";

export const dashboardSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  const [products, orders, leads, revenue] = await Promise.all([
    ProductModel.countDocuments(),
    OrderModel.countDocuments(),
    LeadModel.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    }),
    OrderModel.aggregate([
      { $match: { payment_status: "paid" } },
      { $group: { _id: null, total: { $sum: "$final_price" } } },
    ]),
  ]);

  res.json({
    products,
    orders,
    leads,
    revenue: revenue[0]?.total || 0,
  });
};

export const ordersAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ordersByDate = await OrderModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        orders: { $sum: 1 },
        revenue: { $sum: "$final_price" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const orderStatus = await OrderModel.aggregate([
    {
      $group: {
        _id: "$status",
        value: { $sum: 1 },
      },
    },
  ]);

  res.json({ ordersByDate, orderStatus });
};

export const revenueBreakdown = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        online: { $sum: "$online_paid_amount" },
        cod: { $sum: "$cod_amount" },
        discount: { $sum: "$discount" },
      },
    },
  ]);

  res.json(data[0] || { online: 0, cod: 0, discount: 0 });
};

export const topProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = await OrderModel.aggregate([
    {
      $group: {
        _id: "$order_items.productId",
        name: { $first: "$order_items.name" },
        quantity: { $sum: "$order_items.quantity" },
        revenue: {
          $sum: {
            $multiply: ["$order_items.quantity", "$order_items.price"],
          },
        },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 },
  ]);

  res.json(data);
};

export const leadsFunnel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const total = await LeadModel.countDocuments();
  const read = await LeadModel.countDocuments({ isRead: true });

  res.json({
    total,
    unread: total - read,
    read,
  });
};

export const dealsAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  const usedDeals = await OrderModel.aggregate([
    { $match: { couponCode: { $ne: null } } },
    {
      $group: {
        _id: "$couponCode",
        usage: { $sum: 1 },
        revenue: { $sum: "$final_price" },
      },
    },
    { $sort: { usage: -1 } },
  ]);

  res.json(usedDeals);
};

export const paymentSplit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = await OrderModel.aggregate([
    {
      $group: {
        _id: "$payment_method",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(data);
};

export const recentActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orders = await OrderModel.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber final_price status createdAt");

  const leads = await LeadModel.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("subject senderEmail createdAt");

  res.json({ orders, leads });
};
