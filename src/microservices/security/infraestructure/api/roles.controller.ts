import { Request, Response } from "express";

import { ErrorHandlerService } from "../../../../api-gateway/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RoleManagement } from "../../application/use-cases/role-management";
import { RoleMiddleware } from "../middlewares/role.middleware";

export class RolesController {

    private readonly _LIST_PAGINATION_LIMIT: number;
    private readonly _roleMiddleware: RoleMiddleware;
    private readonly _handlerError: ErrorHandlerService;

    constructor(
        private readonly _roleManagement: RoleManagement,
    ) {
        this._LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);
        this._roleMiddleware = new RoleMiddleware();
        this._handlerError = new ErrorHandlerService();
    }

    async getList(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = this._LIST_PAGINATION_LIMIT || 10;
            const offset = (page - 1) * limit;
            res.status(200).json(await this._roleManagement.getList({ limit, offset }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._roleManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        await this._roleMiddleware.validateAdd(req, res, async () => {
            try {
                const result = await this._roleManagement.add(req.body);
                res.status(200).json(result);
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        await this._roleMiddleware.validateEdit(req, res, async () => {
            try {
                res.status(200).json(await this._roleManagement.edit(id, req.body));
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._roleManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };
}
