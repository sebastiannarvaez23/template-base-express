import { DataTypes, Model } from "sequelize";

import { PersonEntity } from "../../domain/entities/person.entity";
import database from "../../../../config/database";

export class PersonModel extends Model<PersonEntity> implements PersonEntity {
  id?: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  birthDate!: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

PersonModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id",
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      field: "phone",
    },
    birthDate: {
      type: DataTypes.DATE,
      field: "birth_date",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    }
  },
  {
    sequelize: database,
    tableName: "persons",
    timestamps: true,
    paranoid: true,
  }
);