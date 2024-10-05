import express from 'express';

import { authMiddleware, authorizationMiddleware } from '../../../../auth/infraestructure/dependencies';
import { serviceController, serviceMiddleware } from '../../../dependencies';

const servicesRoutes = express.Router();

servicesRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0401'),
    serviceController.getList.bind(serviceController));

servicesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0401'),
    serviceController.get.bind(serviceController));

servicesRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0403'),
    serviceMiddleware.validateAdd.bind(serviceMiddleware),
    serviceController.add.bind(serviceController));

servicesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0404'),
    serviceMiddleware.validateEdit.bind(serviceMiddleware),
    serviceController.edit.bind(serviceController));

servicesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0405'),
    serviceController.delete.bind(serviceController));

export default servicesRoutes;