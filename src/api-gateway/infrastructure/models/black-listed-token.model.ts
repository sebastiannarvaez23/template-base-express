import { DataTypes, Model } from "sequelize";
import database from "../../../config/database";
import { BlackListedTokenEntity } from "../../domain/entities/black-listed-token.entity";

export class BlackListedTokenModel
  extends Model<BlackListedTokenEntity>
  implements BlackListedTokenEntity
{
  id?: string;
  userId!: string;
  token!: string;
  expiryDt!: Date;
  createdAt!: Date;
  updateAt!: Date;
}

BlackListedTokenModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      field: "id",
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      type: DataTypes.UUIDV4,
      field: "token",
    },
    userId: { type: DataTypes.STRING, field: "user_id" },
    expiryDt: { type: DataTypes.DATE, field: "expire" },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updateAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {
    sequelize: database,
    tableName: "black_list_tokens",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
