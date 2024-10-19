import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";

import { ServiceModel } from "../../../service/infraestructure/models/service.model";
import { RoleServiceModel } from "./role-service.model";

@Table({
    timestamps: true,
    tableName: 'roles',
    paranoid: true,
    modelName: 'RoleModel',
})
export class RoleModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        field: 'id',
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING(100),
        field: 'name',
        allowNull: false,
        unique: true,
    })
    declare name: string;

    @Column({
        type: DataType.UUID,
        field: 'created_by',
        allowNull: false,
        unique: true,
    })
    declare createdBy: string;

    @Column({
        type: DataType.UUID,
        field: 'updated_by',
        allowNull: true,
        unique: true,
    })
    declare updatedBy: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: 'created_at',
    })
    declare createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: 'updated_at',
    })
    declare updatedAt: Date;

    @DeletedAt
    @Column({
        type: DataType.DATE,
        field: 'deleted_at',
    })
    declare deletedAt: Date;

    @BelongsToMany(() => ServiceModel, () => RoleServiceModel)
    services!: ServiceModel[];
}