import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/database";
import { hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export class UserTest {

    static async delete() {
        await prisma.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await this.delete()
        return prisma.user.create({
            data: {
                username: "test",
                name: "test",
                password: await hashPassword("rahasia"),
                role: "USER",
                weight: 60
            }
        })
    }

    static async token() {
        const user = await this.create()

        return generateToken({
            id: user.id,
            role: Role.USER
        })
    }
}