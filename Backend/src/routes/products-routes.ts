import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getProductBySlug,
  updateProduct,
} from "../controllers/products-controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import upload from "../config/multer";

const router: Router = Router();

router.get("/:slug", getProductBySlug);
router.get("/", getAllProducts);
router.post("/", authenticateJWT, authorizeRole("admin"), upload.array("images"), createProduct);
router.post("/getProducts", getProductByCategory);
router.put("/", authenticateJWT, authorizeRole("admin"), updateProduct);
router.delete("/:slug", authenticateJWT, authorizeRole("admin"), deleteProduct);

export default router;
