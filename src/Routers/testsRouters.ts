import { Router } from "express";

import * as testsController from "../Controllers/testsControllers"
import { validateToken } from "../Middlewares/authValidation";
import { validateSchema } from "../Middlewares/schemaValidation";
import * as testSchema from "../Schemas/testSchema"

export const testsRouter = Router();

testsRouter.post("/test",validateSchema(testSchema.test), testsController.postTest);
testsRouter.get("/test/discipline", testsController.getByDiscipline);
testsRouter.get("/test/teacher", testsController.getByTeacher);