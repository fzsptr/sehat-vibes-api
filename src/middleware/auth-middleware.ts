import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new ResponseError(401, "Unauthorized")
    }

    const [type, token] = authHeader.split(" ")

    if (type !== "Bearer" || !token) {
        throw new ResponseError(401, "Unauthorized")
    }

    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();

    } catch {
        throw new ResponseError(401, "Unauthorized")
    }
}