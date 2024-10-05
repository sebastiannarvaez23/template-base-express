import { AuthorizationMiddleware } from "../../../auth/infraestructure/middlewares/authorization.middleware";
import { ErrorHandlerService } from "../../../../lib-core/services/error-handler.service";
import { RoleManagement } from "../application/use-cases/role-management";
import { RoleMiddleware } from "./middlewares/role.middleware";
import { RolesController } from "./api/roles.controller";
import { RolesRepositoryImpl } from "./repositories/role.repository-impl";


const handlerError: ErrorHandlerService = new ErrorHandlerService();
const rolesRepository = new RolesRepositoryImpl();
const roleManagement = new RoleManagement(rolesRepository);

export const roleMiddleware: RoleMiddleware = new RoleMiddleware();
export const roleController: RolesController = new RolesController(roleManagement, handlerError);