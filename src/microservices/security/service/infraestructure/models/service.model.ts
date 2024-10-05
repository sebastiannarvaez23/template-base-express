import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

import { RoleModel } from '../../../role/infraestructure/models/role.model';
import { RoleServiceModel } from '../../../role/infraestructure/models/role-service.model';

@Table({
    timestamps: true,
    tableName: 'services',
    paranoid: true,
    modelName: 'ServiceModel',
})
export class ServiceModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        field: 'id',
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        field: 'code',
        unique: true,
        allowNull: false,
    })
    declare code: string;

    @Column({
        type: DataType.STRING,
        field: 'name',
        allowNull: false,
    })
    declare name: string;

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

    @BelongsToMany(() => RoleModel, () => RoleServiceModel)
    roles!: RoleModel[];
}