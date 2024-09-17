export interface UserEntity {
    id?: string;
    nickname: string;
    password: string;
    lastAuth: Date;
    origin: string;
    active: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}