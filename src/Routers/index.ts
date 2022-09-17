import { Router } from "express";

import { userRouter } from "./userRoutes";
import { testsRouter } from "./testsRouters";

export const router = Router();

router.use(userRouter);
router.use(testsRouter);