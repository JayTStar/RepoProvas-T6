import {Request, Response} from "express";

import { UserData } from "../Repositories/userRepositories";
import * as userService from "../Services/userServices"

export async function signup(req: Request, res: Response){
    const user: UserData = req.body; 

    await userService.singup(user);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
    const user: UserData = req.body;

    const token = await userService.signin(user);

    res.status(200).send({token: token});
}