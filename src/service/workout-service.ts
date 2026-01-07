import { prisma } from "../lib/database";
import { toWorkoutResponse } from "../mapper/workout-mapper";
import { CreateWorkoutRequest, WorkoutResponse } from "../model/workout-mode";
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
    
}