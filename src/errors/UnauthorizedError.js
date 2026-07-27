import BaseError from "./BaseError.js";

export default class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, 401);
    }
}