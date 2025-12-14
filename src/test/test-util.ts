import { prisma } from "../lib/database";
import { hashPassword } from "../utils/bcrypt";

export class UserTest {

    static async delete() {
        await prisma.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prisma.user.create({
            data: {
                username: "test",
                name: "test",
                password: await hashPassword("rahasia"),
                role: "USER",
                weight: 60
            }
        })
    }
}