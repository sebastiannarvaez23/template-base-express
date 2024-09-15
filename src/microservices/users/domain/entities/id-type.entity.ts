export interface IdTypeEntity {
    id?: string;
    code: string;
    desc: string;
    active: number;
    userReg: string;
    userMod?: string;
    createdAt?: Date;
    updatedAt?: Date;
}