import { RoleEntity } from "../security/role.entity";
import { UserEntity } from "../../microservices/users/user/domain/entities/user.entity";

export interface PersonEntity {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    roleId?: string;
    userId?: string;
    createdBy?: string;
    updatedBy?: string;
    role?: RoleEntity;
    user?: UserEntity;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}