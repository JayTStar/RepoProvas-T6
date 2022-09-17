import { Router } from "express";

import { validateSchema } from "../Middlewares/schemaValidation";
import * as userSchema from "../Schemas/userSchemas";
import * as userController from "../Controllers/userControllers"

export const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema.signUpSchema), userController.signup);
userRouter.post("/sign-in", validateSchema(userSchema.signInSchema), userController.signin);