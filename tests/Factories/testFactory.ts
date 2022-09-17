import { faker } from "@faker-js/faker";

export async function testFactory(){
    const test = {
        name: faker.lorem.word(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 1
    }

    return test
}