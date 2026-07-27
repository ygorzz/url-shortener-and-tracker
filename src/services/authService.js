import user from "../models/User.js";
import ConflictError from "../errors/ConflictError.js";
import BadRequestError from "../errors/BadRequestError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(name, email, password) {
    const alreadyExists = await user.findOne({email});
    if(alreadyExists) throw new ConflictError("An account with this email already exists");

    const hashPassword = await bcrypt.hash(password, 10);

    const registeredUser = await user.create({name, email, hashPassword}); 

    return registeredUser;
}

export async function login(email, password) {
    const userExists = await user.findOne({email});
    if(!userExists) throw new BadRequestError("Invalid email or password");

    const validationPassword = await bcrypt.compare(password, userExists.hashPassword);
    if(!validationPassword) throw new BadRequestError("Invalid email or password");

    const token = generateAccessToken({id: userExists._id});

    return token;
}

function generateAccessToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}