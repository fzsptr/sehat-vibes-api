import { Request, Response,NextFunction } from "express";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response = await UserService.register(request)
            
            res.status(200).json({
                status: "success",
                message: "Register Successfully",
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({
                status: "success",
                message: "Login Successfully",
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async get(req: Request,res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!.id)
            
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request : UpdateUserRequest = req.body as UpdateUserRequest
            const response = await UserService.update(req.user!.id, request)
            
            res.status(200).json({
                status: "success",
                message: "Update Successfully",
                data: response
            })
        } catch(e) {
            next(e)
        }
    }
}