import { Router } from "express";
import { createRazorPayOrder } from "../controllers/payment-controller";

const router: Router = Router();

router.post("/create-order", createRazorPayOrder);

export default router;
