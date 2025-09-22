import { Router } from "express";
import { createCheckoutSession, createRazorPayOrder, verifyCheckoutSession, verifyPayment } from "../controllers/payment-controller";

const router: Router = Router();

router.post("/create-order", createRazorPayOrder);
router.post("/verify-payment", verifyPayment);
router.post("/checkout", createCheckoutSession);
router.post("/checkout/verify-token", verifyCheckoutSession);

export default router;
