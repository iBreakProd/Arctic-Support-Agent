import { Router } from "express";
import { asyncHandler } from "../handlers/asyncHandler";
import {
  getAllOrders,
  createOrder,
  getOrderById,
} from "../controllers/orderControllers";
import { rateLimitCreateOrderMw } from "../middleware/rateLimitMiddleware";

const router: Router = Router();

router
  .route("/")
  .get(asyncHandler(getAllOrders))
  .post(rateLimitCreateOrderMw, asyncHandler(createOrder));

router.get("/:id", asyncHandler(getOrderById));

export default router;
