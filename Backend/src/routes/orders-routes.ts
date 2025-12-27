import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  sendOTPEmail,
  verifyOTP,
} from "../controllers/orders-controller";
import { authorizeRole } from "../middleware/authorizeRole";

const router: Router = Router();

router.post("/", createOrder);
router.get("/", authenticateJWT, authorizeRole("admin"), getAllOrders);
router.patch("/:orderId", authenticateJWT, authorizeRole("admin"), updateOrder);
router.delete(
  "/:orderId",
  authenticateJWT,
  authorizeRole("admin"),
  deleteOrder
);
router.get("/:orderId", authenticateJWT, authorizeRole("admin"), getOrderById);
router.post("/sendotp", sendOTPEmail);
router.post("/verifyotp", verifyOTP);

export default router;
