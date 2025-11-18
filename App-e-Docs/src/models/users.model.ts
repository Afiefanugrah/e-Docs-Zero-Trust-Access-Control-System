import sequelize from "../config/db.config";
import Roles from "./roles.model";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  roleId: number;
  isActive: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
  > {}

class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public roleId!: number;
  public isActive!: Boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "roleId",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") as any,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") as any,
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP") as any,
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Users.belongsTo(Roles, {
//     foreignKey: 'roleId', // Kolom FK di tabel Users
//     as: 'role',           // Alias untuk query: user.getRole() atau user.role
// });

export default Users;
