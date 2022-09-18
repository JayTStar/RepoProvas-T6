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

        const result = await supertest(app).post("/test").send(test);
        const createdTest = await prisma.test.findFirst({
            where:{ name: test.name}
        });

        delete createdTest.id

        expect(result.status).toBe(201);
        expect(createdTest).not.toBe(null);
        expect(createdTest).toStrictEqual(test);
    });
});

describe("Get /test", () => {
    it("buscando test por diciplina retorno 200", async () => {

        const result = await supertest(app).get(`/test/discipline`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Buscando test por instrutor retorno 200", async () => {

        const result = await supertest(app).get(`/test/teacher`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});