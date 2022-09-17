import { Response, Request } from "express";

import * as testsService from "../Services/testsServices"
import { TestData } from "../Repositories/testsRepositories";

export async function postTest(req: Request, res: Response){
    const test: TestData = req.body;

    await testsService.postTest(test);

    res.sendStatus(201)
};

export async function getByDiscipline(req: Request, res: Response){
    const {id} = req.params;

    const tests = await testsService.getByDiscipline(parseInt(id));

    res.status(200).send(tests);
}