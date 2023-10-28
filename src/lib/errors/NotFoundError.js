import { BaseError } from "./BaseError.js";

export class NotFoundError extends BaseError {

    constructor() {
        super(404, "not found");
    }
}