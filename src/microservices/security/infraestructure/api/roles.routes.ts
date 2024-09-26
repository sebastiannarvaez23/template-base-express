import express from 'express';

import { AuthMiddleware } from '../../../auth/infraestructure/middlewares/auth.middleware';
import { RedisConfig } from '../../../../config/redis';
import { roleController } from '../dependencies';

const rolesRoutes = express.Router();
const redis: any = new RedisConfig();
const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY!, redis);

rolesRoutes.get("/",
    authMiddleware.authenticateToken,
    roleController.getList.bind(roleController));

rolesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    roleController.get.bind(roleController));

rolesRoutes.post("/",
    authMiddleware.authenticateToken,
    roleController.add.bind(roleController));

rolesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    roleController.edit.bind(roleController));

rolesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    roleController.delete.bind(roleController));

export default rolesRoutes;