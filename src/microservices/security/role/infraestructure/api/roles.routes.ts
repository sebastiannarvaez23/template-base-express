import express from "express";

import { buildRolListQueryParams } from "../middlewares/rol-query-params.middleware";
import { roleController, roleMiddleware, authMiddleware, authorizationMiddleware, queryParamsMiddleware } from "../../../dependencies";
import { RolListValidator } from "../../application/validations/rol-qlist.validator";

const rolesRoutes = express.Router();

rolesRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0301'),
    queryParamsMiddleware.queryValidationMiddleware(new RolListValidator(), buildRolListQueryParams),
    roleController.getList.bind(roleController));

rolesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0302'),
    roleController.get.bind(roleController));

rolesRoutes.post("/",
    authMiddleware.authenticateToken,
    roleMiddleware.validateAdd.bind(roleMiddleware),
    authorizationMiddleware.checkAccess('0303'),
    roleController.add.bind(roleController));

rolesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0304'),
    roleMiddleware.validateEdit.bind(roleMiddleware),
    roleController.edit.bind(roleController));

rolesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0305'),
    roleController.delete.bind(roleController));

rolesRoutes.post("/service-assignment/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0306'),
    roleMiddleware.validateRolAddorDeleteServiceAssignment.bind(roleMiddleware),
    roleController.addServiceAssignment.bind(roleController));

rolesRoutes.delete("/service-assignment/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0307'),
    roleMiddleware.validateRolAddorDeleteServiceAssignment.bind(roleMiddleware),
    roleController.deleteServiceAssignment.bind(roleController));

export default rolesRoutes;