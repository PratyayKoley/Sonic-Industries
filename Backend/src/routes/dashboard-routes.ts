import { Router } from "express";
import {
  dashboardSummary,
  dealsAnalytics,
  leadsFunnel,
  ordersAnalytics,
  paymentSplit,
  recentActivity,
  revenueBreakdown,
  topProducts,
} from "../controllers/dashboard-controller";

const router: Router = Router();

router.get("/summary", dashboardSummary);
router.get("/analytics", ordersAnalytics);
router.get("/revenue-breakdown", revenueBreakdown);
router.get("/topProducts", topProducts);
router.get("/leads-trends", leadsFunnel);
router.get("/deals-analytics", dealsAnalytics);
router.get("/payment-split", paymentSplit);
router.get("/recent-activity", recentActivity);

export default router;
