import express from 'express';

import { personController } from '../dependencies';
import { AuthMiddleware } from '../../../auth/infraestructure/middlewares/auth.middleware';

const personsRoutes = express.Router();
const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY!);

personsRoutes.get("/",
    authMiddleware.authenticateToken,
    personController.getList.bind(personController));

personsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    personController.get.bind(personController));

personsRoutes.post("/",
    authMiddleware.authenticateToken,
    personController.add.bind(personController));

personsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    personController.edit.bind(personController));

personsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    personController.delete.bind(personController));

export default personsRoutes;