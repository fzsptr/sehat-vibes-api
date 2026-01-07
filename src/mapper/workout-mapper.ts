import { Workout } from "../../generated/prisma/client";
import { WorkoutResponse } from "../model/workout-mode";

export function toWorkoutResponse(workout: Workout) : WorkoutResponse {
    return {
        id: workout.id,
        title: workout.title,
        calories: workout.calories,
        duration: workout.duration,
        ytUrl: workout.ytUrl,
        createdAt: workout.createdAt
    }
}