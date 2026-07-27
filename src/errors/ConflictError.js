import BaseError from "./BaseError.js";

export default class ConflictError extends BaseError {
    constructor(message){
        super(message, 409);
    }
}