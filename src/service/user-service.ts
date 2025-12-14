import { ResponseError } from "../error/response-error";
import { prisma } from "../lib/database";
import { toRegisterUserResponse } from "../mapper/user-mapper";
import { RegisterUserRequest, RegisterUserResponse } from "../model/user-model";
import { hashPassword } from "../utils/bcrypt";
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
}