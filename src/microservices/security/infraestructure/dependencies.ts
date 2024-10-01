import { ErrorHandlerService } from "../../../lib-core/services/error-handler.service";
import { RoleManagement } from "../application/use-cases/role-management";
import { RoleMiddleware } from "./middlewares/role.middleware";
import { RolesController } from "./api/roles.controller";
import { RolesRepositoryImpl } from "./repositories/role.repository-impl";
import { ServiceManagement } from "../application/use-cases/service-management";
import { ServicesController } from "./api/service.controller";
import { ServicesRepositoryImpl } from "./repositories/service.repository-impl";
import { ServiceMiddleware } from "./middlewares/service.middleware";

const handlerError: ErrorHandlerService = new ErrorHandlerService();

// abstract

const rolesRepository = new RolesRepositoryImpl();
const servicesRepository = new ServicesRepositoryImpl();

const roleManagement = new RoleManagement(rolesRepository);
const serviceManagement = new ServiceManagement(servicesRepository);

// dependencies

export const serviceMiddleware = new ServiceMiddleware();
export const roleMiddleware: RoleMiddleware = new RoleMiddleware();
export const roleController = new RolesController(roleManagement, handlerError);
export const serviceController = new ServicesController(serviceManagement, handlerError);