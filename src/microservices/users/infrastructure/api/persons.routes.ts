import express from 'express';

import { personController } from '../dependencies';
import { authMiddleware, authorizationMiddleware } from '../../../auth/infraestructure/dependencies';

const personsRoutes = express.Router();

personsRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0201'),
    personController.getList.bind(personController));

personsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0202'),
    personController.get.bind(personController));

personsRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0203'),
    personController.add.bind(personController));

personsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0204'),
    personController.edit.bind(personController));

personsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0205'),
    personController.delete.bind(personController));

export default personsRoutes;