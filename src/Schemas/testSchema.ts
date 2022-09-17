import { TestData } from "../Repositories/testsRepositories";
import Joi from "joi";

export const test = Joi.object<TestData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()
})