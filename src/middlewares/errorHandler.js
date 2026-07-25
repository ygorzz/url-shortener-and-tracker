import BaseError from "../errors/BaseError.js";

export default function errorHandler(error, req, res, next) {
    if(error instanceof BaseError){
        error.sendAnswer(res);
    } else {
        console.log(error);
        new BaseError().sendAnswer(res);
    }
}