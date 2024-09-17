import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'persons',
  paranoid: true,
  modelName: 'PersonModel'
})
export class PersonModel extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    field: 'id',
    defaultValue: DataType.UUIDV4
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

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at', // Ajusta el nombre del campo aquí
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at', // Ajusta el nombre del campo aquí
  })
  declare updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    field: 'deleted_at', // Ajusta el nombre del campo aquí
  })
  declare deletedAt: Date;
}