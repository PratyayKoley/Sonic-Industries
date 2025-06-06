import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  clearCart,
  createCart,
  getCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../controllers/cart-controller";

const router: Router = Router();

router.get("/", authenticateJWT, getCart);
router.post("/", authenticateJWT, createCart);
router.patch("/", authenticateJWT, updateCartItemQuantity);
router.delete("/:productId", authenticateJWT, removeItemFromCart);
router.delete("/", authenticateJWT, clearCart);

export default router;