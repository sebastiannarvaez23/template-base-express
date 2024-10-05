export interface UserEntity {
    id?: string;
    nickname?: string;
    password?: string;
    lastAuth?: Date | null;
    origin?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}