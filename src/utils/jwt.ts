import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

export const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
}