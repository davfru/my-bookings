import { BaseError } from './BaseError.js';

export class BookingConflictError extends BaseError {
    constructor() {
        super(409, "time slot not available");
    }
}