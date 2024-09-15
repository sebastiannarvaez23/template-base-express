export interface TokenEntity {
    id?: string; 
    userId?: string;
    token?: string;
    expiryDt: Date;
    active: number;
    userReg: string;
    userMod?: string;
    createdAt?: Date;
    updatedAt?: Date;
}