import { ServiceEntity } from "./service.entity";

export interface RoleEntity {
    id?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    services?: ServiceEntity[];
}