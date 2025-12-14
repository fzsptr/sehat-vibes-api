import { Role } from "../../generated/prisma/enums"

export type RegisterUserResponse = {
    id: number,
    username: string,
    name: string,
    weight: number | null,
    role: Role,
    createdAt: Date,
}

export type RegisterUserRequest = {
    username: string,
    name: string,
    weight?: number,
    password: string
}

export type LoginUserResponse = {
    access_token: string,
    token_type: "Bearer",
    expired_in: "1d";
    user: {
        id: number,
        name: string,
        role: Role
    }
}

export type LoginUserRequest = {
    username: string,
    password: string
}