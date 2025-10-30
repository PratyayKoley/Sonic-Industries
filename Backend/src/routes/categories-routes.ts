import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  getCategoryImages,
  updateCategory,
} from "../controllers/categories-controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router: Router = Router();

router.get("/:slug", getCategoryBySlug);
router.get("/", getAllCategories);
router.post("/", authenticateJWT, authorizeRole("admin"), createCategory);
router.put("/", authenticateJWT, authorizeRole("admin"), updateCategory);
router.delete("/:slug", authenticateJWT, authorizeRole("admin"), deleteCategory);
router.get("/:id/images", getCategoryImages);

export default router;