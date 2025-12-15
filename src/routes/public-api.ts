import express from "express"
import { Router } from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router()

// Auth User Api
publicRouter.post("/auth/register", UserController.register)
publicRouter.post("/auth/login", UserController.login)