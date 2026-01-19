import { User } from "../../generated/prisma/client";
import { prisma } from "../lib/database";
import { toWorkoutResponse } from "../mapper/workout-mapper";
import { CreateWorkoutRequest, WorkoutResponse, WorkoutStatisticsResponse, WorkoutStreakResponse, WorkoutTodayResponse, WorkoutWeekResponse } from "../model/workout-mode";
import { Validation } from "../validation/validation";
import { WorkoutValidation } from "../validation/workout-validation";

export class WorkoutService {

    static async create(userId: number, req: CreateWorkoutRequest) : Promise <WorkoutResponse> {
        const workoutRequest = Validation.validate(WorkoutValidation.CREATE, req)

        const workout = await prisma.workout.create({
            data: {
                userId,
                title: workoutRequest.title,
                calories: workoutRequest.calories,
                duration: workoutRequest.duration,
                ytUrl: workoutRequest.ytUrl
            }
            
        })

        return toWorkoutResponse(workout)
    }

    static async get(userId: number) : Promise <WorkoutResponse[]> {

        const workouts = await prisma.workout.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return workouts.map(toWorkoutResponse)
    }

    static async getToday(userId: number) : Promise <WorkoutTodayResponse> {
        const start = new Date()
        start.setUTCHours(0, 0, 0, 0)

        const end = new Date()
        end.setUTCHours(23, 59, 59, 999)

        const workouts = await prisma.workout.findMany({
            where: {
                userId,
                createdAt: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            date: start.toISOString().split("T")[0],
            totalWorkout: workouts.length,
            totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
            totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
            workouts: workouts.map(toWorkoutResponse)
        }
    }

    static async getWeek(userId: number) : Promise <WorkoutWeekResponse> {
        const end = new Date()
        end.setUTCHours(23, 59, 59, 999)

        const start = new Date()
        start.setUTCDate(end.getUTCDate() - 6)
        start.setUTCHours(0, 0, 0, 0)

        const workouts = await prisma.workout.findMany({
            where:{
                userId,
                createdAt: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            startDate: start.toISOString().split("T")[0],
            endDate: end.toISOString().split("T")[0],
            totalWorkout: workouts.length,
            totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
            totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
            workouts: workouts.map(toWorkoutResponse)
        }
    }

    static async getStatistics(userId: number) : Promise <WorkoutStatisticsResponse> {
        const workouts = await prisma.workout.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        if(workouts.length === 0) {
            return {
                totalWorkout: 0,
                totalCalories: 0,
                totalDuration: 0
            }
        }

        return {
            totalWorkout: workouts.length,
            totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
            totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0)
        }
    }

    static async getStreak(userId: number): Promise<WorkoutStreakResponse> {
        const workouts = await prisma.workout.findMany({
            where: { userId },
            select: { createdAt: true },
            orderBy: { createdAt: "asc" }
        })

        if (workouts.length === 0) {
            return {
                firstWorkoutDate: null,
                lastWorkoutDate: null,
                totalWorkoutsDays: 0,
                currentStreak: 0,
                longestStreak: 0
            }
        }

        const toDateOnly = (date: Date) =>
            new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))

        // mengambil tanggal unik
        const days = Array.from(
            new Set(workouts.map(w => w.createdAt.toISOString().slice(0, 10)))
        )

        const dates = days.map(d => toDateOnly(new Date(d)))

        let longestStreak = 1
        let tempStreak = 1

        for (let i = 1; i < dates.length; i++) {
            const diff =
                (dates[i].getTime() - dates[i - 1].getTime()) / 86400000

            if (diff === 1) {
                tempStreak++
                longestStreak = Math.max(longestStreak, tempStreak)
            } else {
                tempStreak = 1
            }
        }

        const today = toDateOnly(new Date())
        let currentStreak = 1

        for (let i = dates.length - 1; i > 0; i--) {
            const diff =
                (dates[i].getTime() - dates[i - 1].getTime()) / 86400000

            if (diff === 1) {
                currentStreak++
            } else {
                break
            }
        }

        const diffFromToday =
            (today.getTime() - dates[dates.length - 1].getTime()) / 86400000

        if (diffFromToday > 1) {
            currentStreak = 0
        }

        return {
            firstWorkoutDate: days[0],
            lastWorkoutDate: days[days.length - 1],
            totalWorkoutsDays: days.length,
            currentStreak,
            longestStreak
        }
    }
}