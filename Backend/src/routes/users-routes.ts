import { Router } from "express";
import {
  createMemberUser,
  getAllMembers,
  loginUser,
  deleteMembers
} from "../controllers/users-controller";
import { authorizeRole } from "../middleware/authorizeRole";
import { authenticateJWT } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", createMemberUser);
router.get("/", authenticateJWT, authorizeRole("admin"), getAllMembers);
router.delete("/:id", authenticateJWT, authorizeRole("admin"), deleteMembers);
router.post("/login", loginUser);

export default router;
