import * as fs from "fs";
import * as path from "path";

export class HttpError extends Error {
    statusCode: number;
    internalCode: string;

    constructor(internalCode: string) {
        const errorDetails = HttpError.findErrorDetails(internalCode);
        const message = errorDetails?.messageLog || 'An unexpected error occurred';
        const statusCode = errorDetails?.serverStatusCode ? parseInt(errorDetails.serverStatusCode, 10) : 500;

        super(message);
        this.statusCode = statusCode;
        this.internalCode = internalCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static findErrorDetails(internalCode: string) {
        const errorsDir = path.resolve(__dirname, '../../../resources/errors');
        const files = fs.readdirSync(errorsDir);
        let errorDetails = null;

        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(errorsDir, file);
                const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                if (fileContent[internalCode]) {
                    errorDetails = fileContent[internalCode];
                    break;
                }
            }
        }

        if (!errorDetails) {
            console.warn(`Error code ${internalCode} not found in error files.`);
        }

        return errorDetails;
    }
}
