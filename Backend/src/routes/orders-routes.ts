import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { createOrder, deleteOrder, getOrderById, getAllOrders, updateOrder } from "../controllers/orders-controller";
import { authorizeRole } from "../middleware/authorizeRole";

const router: Router = Router();

router.post("/", createOrder);
router.get("/", authenticateJWT, authorizeRole("admin"), getAllOrders);
router.patch("/:orderId", authenticateJWT, authorizeRole("admin"), updateOrder);
router.delete("/:orderId", authenticateJWT, authorizeRole("admin"), deleteOrder);
router.get("/:orderId", authenticateJWT, authorizeRole("admin"), getOrderById);

export default router;