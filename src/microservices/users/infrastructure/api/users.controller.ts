import { Request, Response } from "express";

import { EncryptionService } from "../../services/encryption.service";
import { PersonManagement } from "../../application/use-cases/person-management";
import { UserManagement } from "../../application/use-cases/user-management";
import { UserSession } from "../../application/use-cases/user-session";
import { UsersMiddleware } from "./users.middleware";

export class UsersController {
    private readonly _encryptionService!: EncryptionService;
    private readonly _usersMiddleware!: UsersMiddleware;

    constructor(
        private readonly _userSession: UserSession,
        private readonly _userManagement: UserManagement,
        private readonly _personManagement: PersonManagement,
        encryptionService: EncryptionService,
    ) {
        this._encryptionService = encryptionService,
            this._usersMiddleware = new UsersMiddleware();
    }

    async getList(req: Request, res: Response) {
        res.status(200).json(await this._userManagement.getList(req.query));
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        res.status(200).json(await this._userManagement.get(id));
    }

    async authentication(req: Request, res: Response) {
        const { nickname, password } = req.body;
        const encryptedPassword = this._encryptionService.decrypt(password);
        const authResponse = await this._userSession.authentication(nickname, encryptedPassword);

        if (authResponse) {
            res.status(200).json(authResponse);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }

    async add(req: Request, res: Response) {
        this._usersMiddleware.validateAdd(req, res, async () => {
            res.status(200).json(await this._userManagement.add(req.body));
        });
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        res.status(200).json(await this._userManagement.edit(id, req.body));
    }
}