import { DataTypes, Model } from "sequelize";
import database from "../../../../config/database";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserModel extends Model<UserEntity> implements UserEntity {
    id?: string; 
    nickname!: string;
    email!: string;
    numberPhone!: string;
    password!: string;
    lastAuth!: Date;
    origin!: string;
    active!: number;
    userReg!: string;
    userMod?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

UserModel.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'usr_id',
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        field: 'usr_email',
    },
    numberPhone: {
        type: DataTypes.STRING,
        field: 'usr_number_phone'
    },
    nickname: {
        type: DataTypes.STRING,
        field: 'usr_nickname'
    },
    password: {
        type: DataTypes.STRING,
        field: 'usr_password_hash'
    }, 
    lastAuth: {
        type: DataTypes.DATE,
        field: 'usr_last_auth'
    },
    origin: {
        type: DataTypes.STRING,
        field: 'usr_origin'
    },
    active: {
        type: DataTypes.STRING,
        field: "usr_active",
      },
    userReg: {
        type: DataTypes.STRING,
        field: 'user_reg'
    },
    userMod: {
        field: "user_mod",
        type: DataTypes.STRING,
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
    },
},
{
    sequelize: database,
    tableName: 'users',
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ['usr_nickname'],
        unique: true
      }
    ],
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
        }
    }
});

export class UserMassModel extends Model<UserEntity> implements UserEntity {
    id?: string; 
    nickname!: string;
    email!: string;
    numberPhone!: string;
    password!: string;
    lastAuth!: Date;
    origin!: string;
    active!: number;
    userReg!: string;
    userMod?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

UserMassModel.init({
    id: {
        type: DataTypes.UUIDV4,
        autoIncrement: false,
        primaryKey: true,
        field: 'usr_id',
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        field: 'usr_email',
    },
    numberPhone: {
        type: DataTypes.STRING,
        field: 'usr_number_phone'
    },
    nickname: {
        type: DataTypes.STRING,
        field: 'usr_nickname'
    },
    password: {
        type: DataTypes.STRING,
        field: 'usr_password_hash'
    }, 
    lastAuth: {
        type: DataTypes.DATE,
        field: 'usr_last_auth'
    },
    origin: {
        type: DataTypes.STRING,
        field: 'usr_origin'
    },
    active: {
        type: DataTypes.STRING,
        field: "usr_active",
      },
    userReg: {
        type: DataTypes.STRING,
        field: 'user_reg'
    },
    userMod: {
        field: "user_mod",
        type: DataTypes.STRING,
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
    },
},
{
    sequelize: database,
    tableName: 'users',
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ['usr_nickname'],
        unique: true
      }
    ]
});