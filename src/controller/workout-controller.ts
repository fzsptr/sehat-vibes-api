import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "../service/workout-service";
import { CreateWorkoutRequest } from "../model/workout-mode";

export class WorkoutController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request : CreateWorkoutRequest = req.body as CreateWorkoutRequest
            const response = await WorkoutService.create(req.user!.id, request)
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutService.get(req.user!.id)
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getToday(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutService.getToday(req.user!.id)
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutService.getStatistics(req.user!.id)
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch(e) {
            next(e)
        }
    }
}