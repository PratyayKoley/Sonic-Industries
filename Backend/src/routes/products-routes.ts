import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
} from "../controllers/products-controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router: Router = Router();

router.get("/:slug", getProductBySlug);
router.get("/", getAllProducts);
router.post("/", authenticateJWT, authorizeRole("admin"), createProduct);
router.put("/", authenticateJWT, authorizeRole("admin"), updateProduct);
router.delete("/:slug", authenticateJWT, authorizeRole("admin"), deleteProduct);

export default router;
