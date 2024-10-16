import { Table, Column, Model, PrimaryKey, DataType } from "sequelize-typescript";

@Table({
    tableName: "oauth_clients",
    timestamps: false,
})
export class OAuthClient extends Model<OAuthClient> {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    secret!: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
        defaultValue: [],
    })
    scopes!: string[];
}
