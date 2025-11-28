import express from "express";
const PORT = process.env.PORT;

// Db connettion
import sequelize from "./config/db.config";
import roleModel from "./models/roles.model";
import userModel from "./models/users.model";
import documentModel from "./models/documents.model";
import { setupAssociations } from "./models/associations.model";

// ambil file di routes
import usersEndpoint from "./routes/users.route";
import authEndpoint from "./routes/auth.route";
import documentEndpoint from "./routes/documents.route";

// Middleware
const app = express();
app.use(express.json());

app.use("/api/users", usersEndpoint);
app.use("/api/auth", authEndpoint);
app.use("/api/document", documentEndpoint);

async function initializeServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Koneksi database berhasil.");

    setupAssociations();

    await roleModel.sync({ alter: true });
    await userModel.sync({ alter: true });
    await documentModel.sync({ alter: true });
    console.log("✅ Database disinkronkan. Tabel siap.");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal memulai server atau inisialisasi database:", error);

    process.exit(1);
  }
}

initializeServer();
