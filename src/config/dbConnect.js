import mongoose from "mongoose";

export default function dbConnection() {
    if (!process.env.DB_CONNECTION_STRING) {
        throw new Error("DB_CONNECTION_STRING is required");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is required");
    }
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    return mongoose.connection;
}