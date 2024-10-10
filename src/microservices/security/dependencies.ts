import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../auth/application/validations/auth.validator";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { RoleManagement } from "./role/application/use-cases/role-management";
import { RoleMiddleware } from "./role/infraestructure/middlewares/role.middleware";
import { RolesController } from "./role/infraestructure/api/roles.controller";
import { RolesRepositoryImpl } from "./role/infraestructure/repositories/role.repository-impl";
import { ServiceManagement } from "./service/application/use-cases/service-management";
import { ServiceMiddleware } from "./service/infraestructure/middlewares/service.middleware";
import { ServicesController } from "./service/infraestructure/api/service.controller";
import { ServicesRepositoryImpl } from "./service/infraestructure/repositories/service.repository-impl";


const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();

// abstract

const rolesRepository = new RolesRepositoryImpl();
const servicesRepository = new ServicesRepositoryImpl();

const roleManagement = new RoleManagement(rolesRepository);
const serviceManagement = new ServiceManagement(servicesRepository);

// dependencies

export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(authValidator);
export const serviceMiddleware = new ServiceMiddleware();
export const serviceController = new ServicesController(serviceManagement, handlerError);
export const roleMiddleware: RoleMiddleware = new RoleMiddleware();
export const roleController: RolesController = new RolesController(roleManagement, handlerError);