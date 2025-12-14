import { User } from "../../generated/prisma/client";
import { RegisterUserResponse } from "../model/user-model";

export function toRegisterUserResponse(user: User) : RegisterUserResponse {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        weight: user.weight,
        role: user.role,
        createdAt: user.createdAt
    }
}