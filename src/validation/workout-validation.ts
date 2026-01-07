import z, { ZodType } from "zod";
import { CreateWorkoutRequest } from "../model/workout-mode";

export class WorkoutValidation {

    static readonly CREATE : ZodType <CreateWorkoutRequest> = z.object({
        title: z.string().min(1).max(100),
        calories: z.number().int().positive(),
        duration: z.number().int().positive(),
        ytUrl: z.string().url().max(100).optional()
    })

}