import { RoleManagement } from "../application/use-cases/role-management";
import { RolesController } from "./api/roles.controller";
import { RolesRepositoryImpl } from "./repositories/role.repository-impl";

const rolesRepository = new RolesRepositoryImpl();

const roleManagement = new RoleManagement(rolesRepository);

export const roleController = new RolesController(roleManagement);