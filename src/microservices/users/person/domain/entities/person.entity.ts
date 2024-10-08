import { RoleEntity } from "../../../../security/role/domain/entities/role.entity";
import { UserEntity } from "../../../user/domain/entities/user.entity";

export interface PersonEntity {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    roleId?: string;
    userId?: string;
    role?: RoleEntity;
    user?: UserEntity;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}