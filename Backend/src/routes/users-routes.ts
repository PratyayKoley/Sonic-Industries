import { Router } from "express";
import {
  createMemberUser,
  getAllMembers,
  loginUser,
} from "../controllers/users-controller";

const router: Router = Router();

router.post("/", createMemberUser);
router.get("/", getAllMembers);
router.post("/login", loginUser);

export default router;
