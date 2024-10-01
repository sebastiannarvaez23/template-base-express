import { Request, Response } from "express";

import { ErrorHandlerService } from "../../../../lib-core/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { PersonManagement } from "../../application/use-cases/person-management";
import { PersonMiddleware } from "../middlewares/person.middleware";

export class PersonsController {

    private readonly _LIST_PAGINATION_LIMIT: number;

    constructor(
        private readonly _personManagement: PersonManagement,
        private readonly _handlerError: ErrorHandlerService,
    ) {
        this._LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);
    }

    async getList(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = this._LIST_PAGINATION_LIMIT || 10;
            const offset = (page - 1) * limit;
            res.status(200).json(await this._personManagement.getList({ limit, offset }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._personManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        try {
            const result = await this._personManagement.add(req.body);
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._personManagement.edit(id, req.body));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._personManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };
}
