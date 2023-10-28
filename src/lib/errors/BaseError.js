export class BaseError extends Error {

    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.message = message
    }

    statusCode() {
        return this.statusCode;
    }
}