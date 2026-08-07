import user from "../models/User.js";
import ConflictError from "../errors/ConflictError.js";
import BadRequestError from "../errors/BadRequestError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(name, email, password) {

    validateRegisterFields(name, email, password);

    const alreadyExists = await user.findOne({ email });
    if (alreadyExists) throw new ConflictError("An account with this email already exists");

    const hashPassword = await bcrypt.hash(password, 10);

    const registeredUser = await user.create({ name, email, hashPassword });

    return {
        _id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email
    };
}

export async function login(email, password) {

    validateLoginFields(email, password);

    const userExists = await user.findOne({ email });
    if (!userExists) throw new UnauthorizedError("Invalid email or password");

    const validationPassword = await bcrypt.compare(password, userExists.hashPassword);
    if (!validationPassword) throw new UnauthorizedError("Invalid email or password");

    const token = generateAccessToken({ id: userExists._id });

    return token;
}

// HELPERS FUNCTIONS
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
}

function validateRegisterFields(name, email, password) {

    const formattedEmail = email?.trim().toLowerCase();

    if (!name?.trim() || !email?.trim() || !password?.trim())
        throw new BadRequestError("The name, email and password are required");
    if (!emailIsValid(formattedEmail))
        throw new BadRequestError("Invalid email format");
    if (password.length < 4 || password.length > 16)
        throw new BadRequestError("The password must be between 4 and 16 characters long.");
}

function validateLoginFields(email, password) {

    const formattedEmail = email?.trim().toLowerCase();

    if (!email?.trim() || !password?.trim())
        throw new BadRequestError("The email and password are required");
    if (!emailIsValid(formattedEmail))
        throw new BadRequestError("Invalid email format");
    if (password.length < 4 || password.length > 16)
        throw new BadRequestError("The password must be between 4 and 16 characters long.");
}

function emailIsValid(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);

    return isValid;
}
