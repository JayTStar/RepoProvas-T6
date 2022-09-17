import { faker } from "@faker-js/faker";

export default async function userFactory(){
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password(8)
    };

    return user
};