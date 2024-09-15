import { NextFunction, Request, Response } from "express";

export class UsersMiddleware {
    constructor() { }

    async validateAdd(req: Request, res: Response, next: NextFunction) {
        //if (validations.length > 0) return res.status(400).json({ errorMessage: null });
        next();
    }
    async validateEdit(req: Request, res: Response, next: NextFunction) {
        // return res.status(400).json({ errorMessage: null });
        next();
    }
}