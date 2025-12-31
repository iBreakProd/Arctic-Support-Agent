import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productControllers";
import { asyncHandler } from "../utils/asyncHandler";

const router: Router = Router();

router
  .route("/")
  .get(asyncHandler(getAllProducts))
  .post(asyncHandler(createProduct));

export default router;
