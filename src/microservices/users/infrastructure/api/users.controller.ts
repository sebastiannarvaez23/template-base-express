import { Request, Response } from "express";

import { PersonManagement } from "../../application/use-cases/person-management";
import { PersonMiddleware } from "./person.middleware";
import { ErrorHandlerService } from "../../services/error-handler.service";

export class PersonsController {

    private readonly _personMiddleware: PersonMiddleware;
    private readonly _handlerError: ErrorHandlerService;

    constructor(
        private readonly _personManagement: PersonManagement,
    ) {
        this._personMiddleware = new PersonMiddleware();
        this._handlerError = new ErrorHandlerService();
    }

    async getList(req: Request, res: Response) {
        res.status(200).json(await this._personManagement.getList(req.query));
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        res.status(200).json(await this._personManagement.get(id));
    }

    async add(req: Request, res: Response) {
        await this._personMiddleware.validateAdd(req, res, async () => {
            try {
                const result = await this._personManagement.add(req.body);
                res.status(200).json(result);
            } catch (error) {
                this._handlerError.handle(error, req, res);
            }
        });
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        await this._personMiddleware.validateAdd(req, res, async () => {
            try {
                res.status(200).json(await this._personManagement.edit(id, req.body));
            } catch (error) {
                this._handlerError.handle(error, req, res);
            }
        });
    }
}
