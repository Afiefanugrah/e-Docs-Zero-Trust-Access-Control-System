import sequelize from "../config/db.config";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

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

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "createdAt" | "updatedAt"> {}

class Roles
  extends Model<RoleAttributes, RoleCreationAttributes>
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
    modelName: "Roles",
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Roles.hasMany(Users, {
//   foreignKey: "roleId", // Kolom FK di tabel Users
//   as: "users", // Alias untuk query: role.getUsers()
//   onDelete: "RESTRICT", // Mengunci: Tidak bisa menghapus role jika masih ada user
// });

export default Roles;
