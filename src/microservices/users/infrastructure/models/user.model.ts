import { DataTypes, Model } from "sequelize";

import { UserEntity } from "../../domain/entities/user.entity";
import database from "../../../../config/database";
import { PersonModel } from "./person.model";

export class UserModel extends Model<UserEntity> implements UserEntity {
  id?: string;
  nickname!: string;
  password!: string;
  lastAuth!: Date;
  origin!: string;
  active!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'id',
      defaultValue: DataTypes.UUIDV4,
    },
    nickname: {
      type: DataTypes.STRING,
      field: 'nickname'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password_hash'
    },
    lastAuth: {
      type: DataTypes.DATE,
      field: 'last_auth'
    },
    origin: {
      type: DataTypes.STRING,
      field: 'origin'
    },
    active: {
      type: DataTypes.BOOLEAN,
      field: "active",
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    },
  },
  {
    sequelize: database,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  }
);