import { Request, Response } from "express";

import { ErrorHandlerService } from "../../services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { UserManagement } from "../../application/use-cases/user-management";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UsersController {

    private readonly _usersMiddleware: UserMiddleware;
    private readonly _handlerError: ErrorHandlerService;

    constructor(
        private readonly _userManagement: UserManagement,
    ) {
        this._usersMiddleware = new UserMiddleware();
        this._handlerError = new ErrorHandlerService();
    }

    async add(req: Request, res: Response) {
        await this._usersMiddleware.validateAdd(req, res, async () => {
            try {
                const result = await this._userManagement.add(req.body);
                res.status(200).json(result);
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }
}
