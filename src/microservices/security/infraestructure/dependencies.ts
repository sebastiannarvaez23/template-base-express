import { RoleManagement } from "../application/use-cases/role-management";
import { RolesController } from "./api/roles.controller";
import { RolesRepositoryImpl } from "./repositories/role.repository-impl";
import { ServiceManagement } from "../application/use-cases/service-management";
import { ServicesController } from "./api/service.controller";
import { ServicesRepositoryImpl } from "./repositories/service.repository-impl";

const rolesRepository = new RolesRepositoryImpl();
const servicesRepository = new ServicesRepositoryImpl();

const roleManagement = new RoleManagement(rolesRepository);
const serviceManagement = new ServiceManagement(servicesRepository);

export const roleController = new RolesController(roleManagement);
export const serviceController = new ServicesController(serviceManagement);