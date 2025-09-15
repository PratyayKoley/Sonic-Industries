import { Router } from "express";
import { authorizeRole } from "../middleware/authorizeRole";
import {
  createLead,
  deleteLead,
  getAllLeads,
  markLeadAsRead,
  updateLeadStatus,
} from "../controllers/leads-controller";
import { authenticateJWT } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", authenticateJWT, authorizeRole("admin"), getAllLeads);
router.post("/", createLead);
router.patch(
  "/:id/read",
  authenticateJWT,
  authorizeRole("admin"),
  markLeadAsRead
);
router.patch(
  "/:id/status",
  authenticateJWT,
  authorizeRole("admin"),
  updateLeadStatus
);
router.delete("/:id", authenticateJWT, authorizeRole("admin"), deleteLead);

export default router;
