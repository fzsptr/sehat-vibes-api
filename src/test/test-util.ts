import { User } from "../../generated/prisma/client";
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

    static async create()  {
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

    static async get() : Promise <User>{
        const user =  await prisma.user.findFirst({
            where: {
                username: "test"
            }
        })

        if(!user) {
            throw new Error("User not found")
        }
        
        return user
    }
}

export class WorkoutTest {

    static async delete() {
        await prisma.workout.deleteMany({
            where: {
                userId: 1
            }
        })
    }

    static async create() {
        await this.delete()
        return prisma.workout.create({
            data: {
                userId: 1,
                title: "test",
                calories: 100,
                duration: 10,
                ytUrl: "test"
            }     
        })
    }
}