import express from 'express';

import { AuthMiddleware } from '../../../auth/infraestructure/middlewares/auth.middleware';
import { RedisConfig } from '../../../../config/redis';
import { serviceController } from '../dependencies';

const servicesRoutes = express.Router();
const redis: any = new RedisConfig();
const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY!, redis);

servicesRoutes.get("/",
    authMiddleware.authenticateToken,
    serviceController.getList.bind(serviceController));

servicesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    serviceController.get.bind(serviceController));

servicesRoutes.post("/",
    authMiddleware.authenticateToken,
    serviceController.add.bind(serviceController));

servicesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    serviceController.edit.bind(serviceController));

servicesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    serviceController.delete.bind(serviceController));

export default servicesRoutes;