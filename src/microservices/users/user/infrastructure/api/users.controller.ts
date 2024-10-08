import { Request, Response } from "express";

import { ErrorHandlerUtil } from "../../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { UserManagement } from "../../application/use-cases/user-management";

export class UsersController {

    constructor(
        private readonly _userManagement: UserManagement,
        private readonly _handlerError: ErrorHandlerUtil,
    ) { }

    async add(req: Request, res: Response) {
        try {
            const result = await this._userManagement.add(req.body);
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async validateCredential(req: Request, res: Response) {
        try {
            const result = await this._userManagement.validateCredential(req.body);
            res.status(200).json({ validate: result });
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
