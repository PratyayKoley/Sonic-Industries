import { Router } from "express";
import {
  createDeal,
  deleteDeal,
  getAllDeals,
  getDealById,
  updateDeal,
} from "../controllers/deals-controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import upload from "../config/multer";

const router: Router = Router();

router.get("/:id", authenticateJWT, authorizeRole("admin"), getDealById);
router.get("/", getAllDeals);
router.post("/", authenticateJWT, authorizeRole("admin"), upload.single("imageFile"), createDeal);
router.put("/:id", authenticateJWT, authorizeRole("admin"), updateDeal);
router.delete("/:id", authenticateJWT, authorizeRole("admin"), deleteDeal);

export default router;