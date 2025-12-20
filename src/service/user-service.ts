import { User } from "../../generated/prisma/client";
import { ResponseError } from "../error/response-error";
import { prisma } from "../lib/database";
import { toLoginUserResponse, toRegisterUserResponse, toUserResponse } from "../mapper/user-mapper";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse, UserResponse } from "../model/user-model";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
    static async register(request: RegisterUserRequest) : Promise <RegisterUserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const existsUsername = await prisma.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (existsUsername != 0) {
            throw new ResponseError(400, "Username already exists")
        }

        registerRequest.password = await hashPassword(request.password)

        const user = await prisma.user.create({
            data: registerRequest
        })

        return toRegisterUserResponse(user)
    }

    static async login(request: LoginUserRequest) : Promise <LoginUserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        const user = await prisma.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })        

        if (!user) {
            throw new ResponseError(401, "Username or Password is wrong")
        }

        const isPasswordValid = await comparePassword(loginRequest.password, user.password)
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or Password is wrong")
        }

        const token = generateToken({
            id: user.id,
            role: user.role
        })

        return toLoginUserResponse(user, token)
    
    }

    static async get(userId: number) : Promise <UserResponse> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new ResponseError(404, "User not found")
        }

        return toUserResponse(user)
    }
}