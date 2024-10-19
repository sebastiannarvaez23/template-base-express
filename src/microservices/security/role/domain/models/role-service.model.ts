import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";

import { RoleModel } from "./role.model";
import { ServiceModel } from "../../../service/domain/models/service.model";

@Table({
    tableName: 'roles_services',
    timestamps: false,
})
export class RoleServiceModel extends Model {
    @ForeignKey(() => RoleModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'role_id',
    })
    declare roleId: string;

    @ForeignKey(() => ServiceModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'service_id',
    })
    declare serviceId: string;
}
