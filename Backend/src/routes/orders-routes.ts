import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/orders-controller";

const router: Router = Router();

router.post("/", authenticateJWT, createOrder);
router.get("/", authenticateJWT, getOrders);
router.patch("/:orderId", authenticateJWT, updateOrder);
router.delete("/:orderId", authenticateJWT, deleteOrder);
router.get("/:orderId", authenticateJWT, getOrderById);

export default router;