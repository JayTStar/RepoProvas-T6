import { Response, Request } from "express";

import * as testsService from "../Services/testsServices"
import { TestData } from "../Repositories/testsRepositories";

export async function postTest(req: Request, res: Response){
    const test: TestData = req.body;

    await testsService.postTest(test);

    res.sendStatus(201)
}