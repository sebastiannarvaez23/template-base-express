import express from 'express';

import { AuthMiddleware } from '../../../auth/infraestructure/middlewares/auth.middleware';
import { AuthorizationMiddleware } from '../../../auth/infraestructure/middlewares/authorization.middleware';
import { personController } from '../dependencies';
import { RedisConfig } from '../../../../config/redis';

const personsRoutes = express.Router();
const redis: any = new RedisConfig();
const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY!, redis);
const authorizationMiddleware = new AuthorizationMiddleware();

personsRoutes.get("/",
    authMiddleware.authenticateToken,
    personController.getList.bind(personController));

personsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    personController.get.bind(personController));

personsRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('00001'),
    personController.add.bind(personController));

personsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    personController.edit.bind(personController));

personsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    personController.delete.bind(personController));

export default personsRoutes;