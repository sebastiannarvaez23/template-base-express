import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";

import { UserModel } from "../../../user/infrastructure/models/user.model";

@Table({
  timestamps: true,
  tableName: 'persons',
  paranoid: true,
  modelName: 'PersonModel',
})
export class PersonModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    field: 'id',
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    field: 'first_name',
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING(100),
    field: 'last_name',
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING(100),
    field: 'email',
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(10),
    field: 'phone',
    unique: true,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.DATE,
    field: 'birth_date',
    allowNull: false,
  })
  declare birthDate: Date;

  @Column({
    type: DataType.UUID,
    field: 'user_id',
    allowNull: false,
    unique: true,
  })
  declare userId: string;

  @Column({
    type: DataType.UUID,
    field: 'role_id',
    allowNull: false,
  })
  declare roleId: string;

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

  @BelongsTo(() => UserModel, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user',
  })
  declare user: UserModel;

  @BelongsTo(() => UserModel, {
    foreignKey: 'createdBy',
    targetKey: 'id',
    as: 'userCreatedBy',
  })
  declare userCreatedBy: UserModel;

  @BelongsTo(() => UserModel, {
    foreignKey: 'updatedBy',
    targetKey: 'id',
    as: 'userUpdatedBy',
  })
  declare userUpdatedBy: UserModel;
}
