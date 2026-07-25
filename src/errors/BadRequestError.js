import BaseError from "./BaseError.js";

export default class BadRequestError extends BaseError {
    constructor(message) {
        super(message, 400)
    }
}