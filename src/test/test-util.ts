import { User } from "../../generated/prisma/client";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/database";
import { hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export class UserTest {

    static async delete(id: number) {
        await prisma.user.deleteMany({
            where: {
                id
            }
        })
    }

    static async create() : Promise <User> {
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

    static async token() : Promise <string> {
        const user = await UserTest.create()
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

    static async deleteByUser(userId: number) {
        await prisma.workout.deleteMany({
            where: {
                userId
            }
        })
    }

    static async createToday(userId: number) {
        const today = new Date()
        today.setUTCHours(5, 0, 0, 0)
        return prisma.workout.create({
            data: {
                userId,
                title: "Push Up",
                calories: 100,
                duration: 10,
                ytUrl: "test",
                createdAt: today
            }     
        })
    }

    static async createYesteday(userId: number) {
        const yesterday = new Date()
        yesterday.setUTCDate(yesterday.getUTCDate() - 1)
        yesterday.setUTCHours(5, 0, 0, 0)

        return prisma.workout.create({
            data: {
                userId,
                title: "Plank",
                calories: 200,
                duration: 20,
                ytUrl: null,
                createdAt: yesterday
            }
        })
    }

    static async createFixtures(userId: number) {
        await this.createToday(userId)
        await this.createYesteday(userId)
    }
}