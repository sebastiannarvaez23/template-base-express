import { DataTypes, Model } from "sequelize";
import database from "../../../config/database";
import { TokenEntity } from "../../domain/entities/token.entity";

export class TokenModel extends Model<TokenEntity> implements TokenEntity {
  id?: string;
  userId!: string;
  token!: string;
  expiryDt!: Date;
  active!: number;
  userReg!: string;
  userMod!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

TokenModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      field: "tkn_id",
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      type: DataTypes.UUIDV4,
      field: "tkn_token",
    },
    userId: { type: DataTypes.STRING, field: "tkn_userid" },
    expiryDt: { type: DataTypes.DATE, field: "tkn_expirydt" },
    active: { type: DataTypes.STRING, field: "tkn_active" },
    userReg: { type: DataTypes.STRING, field: "tkn_user_reg" },
    userMod: { type: DataTypes.STRING, field: "tkn_user_mod" },
    createdAt: { type: DataTypes.DATE, field: "tkn_created_at" },
    updatedAt: { type: DataTypes.DATE, field: "tkn_updated_at" },
  },
  {
    sequelize: database,
    tableName: "tokens",
    createdAt: "tkn_created_at",
    updatedAt: "tkn_updated_at",
  }
);
