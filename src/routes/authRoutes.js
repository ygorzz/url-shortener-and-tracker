import express from "express";
import AuthController from "../controllers/authController.js";
import * as rateLimit from "../middlewares/rateLimit.js";

const routes = express.Router();

routes
    .post("/auth/register", rateLimit.creationLimiter, AuthController.register)
    .post("/auth/login", rateLimit.creationLimiter, AuthController.login)


export default routes;