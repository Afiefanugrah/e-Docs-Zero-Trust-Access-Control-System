import { Request, Response } from "express";
import AuditLog from "../models/auditLogs.model"; // Model log audit
import Users from "../models/users.model"; // Model pengguna untuk JOIN
import { sendSuccess, sendError } from "../utils/response.utils";

class AuditController {
  /**
   * Mengambil daftar semua log audit dari database.
   * Hanya diizinkan untuk peran Admin.
   */
  public async getAllAuditLogs(req: Request, res: Response): Promise<Response> {
    try {
      const auditLogs = await AuditLog.findAll({
        // Melakukan JOIN dengan tabel Users untuk melihat siapa yang melakukan aksi
        include: [
          {
            model: Users,
            as: "user", // Alias sesuai dengan asosiasi di associations.model.ts
            attributes: ["id", "username", "roleId"], // Hanya ambil data user yang relevan
          },
        ],
        attributes: { exclude: ["updatedAt"] }, // updated_at jarang relevan untuk log audit
        order: [["createdAt", "DESC"]], // Urutkan berdasarkan waktu terbaru
        limit: 100, // Batasi jumlah log yang diambil untuk performa
      });

      return sendSuccess(
        res,
        auditLogs,
        "Daftar log audit berhasil diambil.",
        200,
        { total: auditLogs.length }
      );
    } catch (error) {
      console.error("Error saat mengambil log audit:", error);
      return sendError(res, "Gagal mengambil log audit.", 500, error);
    }
  }
}

export default new AuditController();
