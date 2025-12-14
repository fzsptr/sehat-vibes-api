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

