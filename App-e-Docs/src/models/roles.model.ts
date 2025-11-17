import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db.config";

export enum UserRole {
  Viewer = "viewer",
  Editor = "editor",
  Admin = "admin",
}

interface RoleAttributes {
  id: number;
  name: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

interface RoleCreationAtributes
  extends Optional<RoleAttributes, "id" | "createdAt" | "updatedAt"> {}

class Roles
  extends Model<RoleAttributes, RoleCreationAtributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      unique: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Roles",
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Roles;
