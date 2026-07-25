export default class BaseError extends Error {
    constructor(message = "Internal server error", status = 500){
        super();
        this.message = message;
        this.status = status;
    }

    sendAnswer(res){
        res.status(this.status).json({
            message: this.message,
            status: this.status
        })
    }
}