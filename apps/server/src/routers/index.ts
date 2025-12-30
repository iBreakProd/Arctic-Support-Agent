import { Router } from "express";
import productRouter from "./productRouter";

const router: Router = Router();

router.use("/product", productRouter);

export default router;
