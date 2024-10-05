import { RoleEntity } from "../../../../security/role/domain/entities/role.entity";

export interface PersonEntity {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    role?: RoleEntity;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}