import { Test } from "@prisma/client";
import { prisma } from "../Config/db";

export type TestData = Omit<Test, "id">

export async function getCategoryById(id: number){
    const category = prisma.categories.findUnique({ where:{ id: id } });

    return category;
}

export async function getTeacherDiscipline(id: number){
    const teachersDiscipline = prisma.teachersDiscipline.findUnique({ where:{ id: id } });

    return teachersDiscipline;
}

export async function createTest(test: TestData){
    await prisma.test.create({ data: test });
}