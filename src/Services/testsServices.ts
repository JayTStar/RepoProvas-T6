import * as testRepository from "../Repositories/testsRepositories";

export async function postTest(test: testRepository.TestData){
    await checkCategory(test.categoryId);
    await checkTeacherDiscipline(test.teacherDisciplineId);

    await testRepository.createTest(test); 
}

async function checkCategory(id: number){
    const category = await testRepository.getCategoryById(id);

    if(!category){
        throw{
            type: "notFound",
            message: "Category not found"
        }
    }
}

async function checkTeacherDiscipline(id: number){
    const teachersDiscipline = await testRepository.getTeacherDiscipline(id);

    if(!teachersDiscipline){
        throw{
            type: "notFound",
            message: "Teachers discipline not found"
        }
    }
}

export async function getByDiscipline(){
    const tests = await testRepository.getTestsbyDiscipline();

    return tests
}

export async function getByTeacher(){
    const tests = await testRepository.getTestsByTeacher();

    return tests
}