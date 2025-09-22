import { Router } from "express";
import {
  createCheckoutSession,
  createRazorPayOrder,
  verifyCheckoutSession,
  verifyPayment,
  markPaymentFailed,
  razorpayWebhook,
} from "../controllers/payment-controller";

const router: Router = Router();

router.post("/create-order", createRazorPayOrder);
router.post("/verify-payment", verifyPayment);
router.post("/checkout", createCheckoutSession);
router.post("/checkout/verify-token", verifyCheckoutSession);
router.post("/mark-failed", markPaymentFailed);
router.post("/webhook", razorpayWebhook);

export default router;
