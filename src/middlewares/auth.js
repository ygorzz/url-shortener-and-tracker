import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError.js";

export default function auth(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) new UnauthorizedError("No token provided").sendAnswer(res); // 401 Unauthorized

        // separates: Bearer <token>
        const token = authHeader.split(" ")[1];
        if (!token) new UnauthorizedError("Malformed token").sendAnswer(res);

        // returns the decoded token or throw an error
        const decode = verifyAccessToken(token);

        next();
    } catch (error) {
        new UnauthorizedError("Invalid or expired token").sendAnswer(res);
    }
}

// returns decoded token or throw an error
function verifyAccessToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}