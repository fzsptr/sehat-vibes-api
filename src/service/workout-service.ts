import { User } from "../../generated/prisma/client";
import { prisma } from "../lib/database";
import { toWorkoutResponse } from "../mapper/workout-mapper";
import { CreateWorkoutRequest, WorkoutResponse, WorkoutStatisticsResponse, WorkoutTodayResponse } from "../model/workout-mode";
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
}