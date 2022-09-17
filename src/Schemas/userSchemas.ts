import Joi from "joi";
import {Users} from "@prisma/client";

export const signUpSchema = Joi.object<Users>({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const signInSchema = Joi.object<Users>({
    email: Joi.string().required(),
    password: Joi.string().required()
});