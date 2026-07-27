import * as authService from "../services/authService.js";

export default class AuthController {
    static async register (req, res, next) {
        try {
            const {name, email, password} = req.body;
            const registeredUser = await authService.register(name, email, password);
            res.status(201).json({message: "User registered successfully", registeredUser})
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({message: "Login successful", token})
        } catch (error) {
            next(error);
        }
    }
}