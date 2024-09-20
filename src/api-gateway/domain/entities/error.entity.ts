export class HttpError extends Error {
    statusCode: number;
    internalCode: string;

    constructor(message: string, statusCode: number = 500, internalCode: string) {
        super(message);
        this.statusCode = statusCode;
        this.internalCode = internalCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
