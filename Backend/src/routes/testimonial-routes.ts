import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
} from "../controllers/testimonial-controller";

const router: Router = Router();

router.get("/", getTestimonials);
router.post("/", authenticateJWT, createTestimonial);
router.delete("/:id", authenticateJWT, deleteTestimonial);

export default router;