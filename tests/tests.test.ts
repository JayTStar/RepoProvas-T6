import { array } from 'joi';
import supertest from 'supertest';
import {app} from '../src/app';
import { prisma } from '../src/Config/db';
import { testFactory } from "./Factories/testFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Test"`;
});

describe("Post /test", () =>{
    it("Adiconando teste return 201", async () => {
        const test = await testFactory();

        const result = await supertest(app).post("/test").send(test)
    });

    it.todo("Adicionando teste já adicionado return 409");
});

describe("Get /test", () => {
    it("buscando test por diciplina retorno 200", async () => {
        const test = await testFactory();

        await supertest(app).post("/test").send(test);

        const result = await supertest(app).get(`/test/discipline/${test.teacherDisciplineId}`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});