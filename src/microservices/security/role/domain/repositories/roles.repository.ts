import { RoleEntity } from '../entities/role.entity';
import { RoleModel } from '../../../infraestructure/models/role.model';

export interface RolesRepository {
    getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: RoleModel[]; count: number; }>;
    get(id: string): Promise<RoleModel | null>;
    add(person: RoleEntity): Promise<RoleModel>;
    edit(id: string, person: RoleEntity): Promise<RoleModel>;
    delete(id: string): Promise<RoleModel>;
    addServiceAssignment(roleId: string, services: string[]): Promise<RoleModel>;
    deleteServiceAssignment(roleId: string, services: string[]): Promise<RoleModel>;
}