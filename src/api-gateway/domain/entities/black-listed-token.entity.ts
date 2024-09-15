export interface BlackListedTokenEntity {
    id?: string;
    userId: string;
    token: string;
    expiryDt: Date;
    createdAt?: Date;
    updateAt?: Date;
}