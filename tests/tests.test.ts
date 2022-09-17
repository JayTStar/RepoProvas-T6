import supertest from 'supertest';
import {app} from '../src/app';
import { prisma } from '../src/Config/db';
import { testFactory } from "./Factories/testFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE`;
});

describe("Post /test", () =>{
    it("Adiconando teste return 201", async () => {
        const test = await testFactory();

        const result = await supertest(app).post("/test").send(test)
    });

    it.todo("Adicionando teste já adicionado return 409");
});

afterAll(async () => {
    await prisma.$disconnect();
});