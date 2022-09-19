import supertest from 'supertest';
import {app} from '../src/app';
import { prisma } from '../src/Config/db';
import { testFactory } from "./Factories/testFactory";
import userFactory from "./Factories/userFactorie"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Test"`;
    await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE`;
});

describe("Post /test", () =>{
    it("Adiconando teste return 201", async () => {
        const test = await testFactory();
        const user = await userFactory();

        await supertest(app).post("/sign-up").send(user);
        
        const token = await supertest(app).post("/sign-in").send(user);

        const result = await supertest(app).post("/test").set('Authorization', 'Bearer ' + token.body.token).send(test);
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
        const user = await userFactory();

        await supertest(app).post("/sign-up").send(user);
        
        const token = await supertest(app).post("/sign-in").send(user);

        const result = await supertest(app).get(`/test/discipline`).set('Authorization', 'Bearer ' + token.body.token);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Buscando test por instrutor retorno 200", async () => {

        const user = await userFactory();

        await supertest(app).post("/sign-up").send(user);
        
        const token = await supertest(app).post("/sign-in").send(user);

        const result = await supertest(app).get(`/test/teacher`).set('Authorization', 'Bearer ' + token.body.token);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});