import { User } from "../../generated/prisma/client";
import { LoginUserResponse, RegisterUserResponse, UserResponse } from "../model/user-model";

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

export function toLoginUserResponse(user: User, token: string) : LoginUserResponse {
    return {
        access_token: token,
        token_type: "Bearer",
        expired_in: "1d",
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role
        }
    }
}

export function toUserResponse(user: User) : UserResponse {
    return {
        id: user.id,
        name: user.name,
        weight: user.weight,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}