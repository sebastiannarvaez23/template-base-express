import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';

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
    type: DataType.STRING,
    field: 'first_name',
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    field: 'last_name',
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    field: 'email',
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    field: 'phone',
  })
  declare phone: string;

  @Column({
    type: DataType.DATE,
    field: 'birth_date',
  })
  declare birthDate: Date;

  @Column({
    type: DataType.UUID,
    field: 'user_id',
    allowNull: false,
    unique: true,
  })
  declare userId: string;

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
  })
  declare user: UserModel;
}
