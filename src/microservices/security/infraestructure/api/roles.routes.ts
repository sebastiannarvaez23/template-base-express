import express from 'express';

import { roleController } from '../dependencies';
import { authMiddleware, authorizationMiddleware } from '../../../auth/infraestructure/dependencies';

const rolesRoutes = express.Router();

rolesRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0201'),
    roleController.getList.bind(roleController));

rolesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0202'),
    roleController.get.bind(roleController));

rolesRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0203'),
    roleController.add.bind(roleController));

rolesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0204'),
    roleController.edit.bind(roleController));

rolesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0205'),
    roleController.delete.bind(roleController));

export default rolesRoutes;