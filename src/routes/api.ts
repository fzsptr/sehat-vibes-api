import express from "express"
import { UserController } from "../controller/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"
import { WorkoutController } from "../controller/workout-controller"

export const apiRouter = express.Router()

// User API
apiRouter.get("/users/current", authMiddleware, UserController.get)
apiRouter.patch("/users/current", authMiddleware, UserController.update)

// Workout API
apiRouter.post("/workouts/history", authMiddleware, WorkoutController.create)
apiRouter.get("/workouts/history", authMiddleware, WorkoutController.get)
apiRouter.get("/workouts/history/today", authMiddleware, WorkoutController.getToday)
apiRouter.get("/workouts/history/statistics", authMiddleware, WorkoutController.getStatistics)