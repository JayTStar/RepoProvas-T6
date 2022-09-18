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

export async function getTestsbyDiscipline(){
    const tests = await prisma.terms.findMany({
        select:{
            number: true,
            Disciplines:{
                select:{
                    name: true,
                    TeachersDiscipline:{
                        select:{
                            teacher:{
                                select:{
                                    name: true
                                }
                            },
                            Test:{
                                select:{
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy:{
            id: 'asc'
        }
    });

    return tests;
}

export async function getTestsByTeacher(){
    const tests = prisma.teachers.findMany({ 
        select:{
            TeachersDiscipline:{
                select:{
                    dicipline:{
                        select:{
                            name: true
                        }
                    },
                    Test:{
                        select:{
                            name: true,
                            category:{
                                select:{
                                    name:true
                                }
                            }
                        },
                        orderBy:{
                            categoryId: 'asc'
                        }
                    }
                }
            }
        }
    });

    return tests
}