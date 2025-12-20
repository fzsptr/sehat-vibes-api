import express from "express"
import { UserController } from "../controller/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"

export const apiRouter = express.Router()
apiRouter.get("/users/current", authMiddleware ,UserController.get)