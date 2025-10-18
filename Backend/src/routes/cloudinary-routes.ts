import { RequestHandler, Router } from "express";
import {
  uploadMultipleImage,
} from "../controllers/cloudinary-controller";

const router: Router = Router();

router.post("/upload-multiple-images", uploadMultipleImage as RequestHandler);

export default router;
