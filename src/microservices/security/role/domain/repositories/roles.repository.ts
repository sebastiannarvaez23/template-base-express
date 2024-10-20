import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { RoleModel } from "../models/role.model";

export interface RolesRepository {
    getList(queryParams: QueryParams): Promise<{ rows: RoleModel[]; count: number; }>;
    get(id: string): Promise<RoleModel | null>;
    add(person: RoleEntity): Promise<RoleModel>;
    edit(id: string, person: RoleEntity): Promise<RoleModel>;
    delete(id: string): Promise<RoleModel>;
    addServiceAssignment(roleId: string, services: string[]): Promise<RoleModel>;
    deleteServiceAssignment(roleId: string, services: string[]): Promise<RoleModel>;
}