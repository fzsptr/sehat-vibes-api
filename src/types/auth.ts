import { Role } from "../../generated/prisma/enums"

export type JwtPayload = {
    id: number,
    role: Role
}