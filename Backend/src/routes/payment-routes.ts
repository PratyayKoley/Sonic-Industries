import { Router } from "express";
import { createRazorPayOrder, verifyPayment } from "../controllers/payment-controller";

const router: Router = Router();

router.post("/create-order", createRazorPayOrder);
router.post("/verify-payment", verifyPayment);

export default router;
