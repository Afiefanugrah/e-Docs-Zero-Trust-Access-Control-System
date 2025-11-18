// src/models/associations.model.ts

import Users from "./users.model";
import Roles from "./roles.model";

export const setupAssociations = () => {
  // 1. Relasi One-to-Many (One Role has Many Users)
  Roles.hasMany(Users, {
    foreignKey: "roleId",
    as: "users",
    onDelete: "RESTRICT",
  });

  // 2. Relasi Many-to-One (Many Users belong to One Role)
  Users.belongsTo(Roles, {
    foreignKey: "roleId",
    as: "role",
  });

  console.log("✅ Asosiasi Users dan Roles berhasil disiapkan.");
};
