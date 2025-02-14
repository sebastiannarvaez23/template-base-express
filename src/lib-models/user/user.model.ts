import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt, HasOne } from "sequelize-typescript";

import { PersonModel } from "./person.model";

@Table({
  timestamps: true,
  tableName: 'users',
  paranoid: true,
  modelName: 'UserModel',
})
export class UserModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    field: 'id',
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'nickname',
    unique: true,
  })
  declare nickname: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'password',
  })
  declare password: string;

  @Column({
    type: DataType.DATE,
    field: 'last_auth',
    allowNull: true,
  })
  declare lastAuth: Date | null;

  @Column({
    type: DataType.STRING,
    field: 'origin',
    allowNull: true,
  })
  declare origin: string | null;

  @Column({
    type: DataType.BOOLEAN,
    field: 'active',
    defaultValue: true,
  })
  declare active: boolean;

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

  @HasOne(() => PersonModel, {
    foreignKey: 'userId',
    sourceKey: 'id',
  })
  declare person: PersonModel;
}
