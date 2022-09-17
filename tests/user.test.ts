import supertest from 'supertest';
import {app} from '../src/app';
import { prisma } from '../src/Config/db';
import userFactory from "./Factories/userFactorie"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE`;
});

describe("Teste de sign-up", () => {
    it("Teste de sign-up retorno 201", async () =>{
        const user = await userFactory();

        const result = await supertest(app).post("/sign-up").send(user);
        const createdUser = await prisma.users.findUnique({ where: { email: user.email } });

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    });

    it("Teste de sign-up com dados duplicados retorno 409", async () => {
        const user = await userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(409);
    });
});

describe("Testes de sign-in", () => {
    it("Teste de sign-in return 200", async () => {
        const user = await userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send(user);

        expect(result.status).toBe(200);
        expect(result.body).not.toBeNull();
    });

    it("Teste de sign-in sem usuário cadastrado return 401", async () =>{
        const user = await userFactory();

        const result = await supertest(app).post("/sign-in").send(user);

        expect(result.status).toBe(401);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});