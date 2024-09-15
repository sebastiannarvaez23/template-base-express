import { PersonEntity } from "./person.entity";

export interface UserEntity {
    id?: string;
    nickname: string;
    email: string;
    numberPhone: string;
    password?: string;
    lastAuth?: Date;
    origin: string;
    active: number;
    userReg: string;
    userMod?: string;
    createdAt?: Date;
    updatedAt?: Date;
    person?:PersonEntity;
}