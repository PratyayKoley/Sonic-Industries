import { Router } from "express";
import { authorizeRole } from "../middleware/authorizeRole";
import { createLead, getAllLeads } from "../controllers/leads-controller";
import { authenticateJWT } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", authenticateJWT, authorizeRole("admin"), getAllLeads);
router.post("/", createLead);

export default router;