import { Request, Response } from "express";

import { ErrorHandlerUtil } from "../../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { ServiceManagement } from "../../application/use-cases/service-management";

export class ServicesController {

    private readonly _LIST_PAGINATION_LIMIT: number;

    constructor(
        private readonly _serviceManagement: ServiceManagement,
        private readonly _handlerError: ErrorHandlerUtil
    ) {
        this._LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);
    }

    async getList(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = this._LIST_PAGINATION_LIMIT || 10;
            const offset = (page - 1) * limit;
            res.status(200).json(await this._serviceManagement.getList({ limit, offset }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._serviceManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        try {
            const result = await this._serviceManagement.add(req.body);
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._serviceManagement.edit(id, req.body));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._serviceManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };
}
