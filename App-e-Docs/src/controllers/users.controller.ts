import { Request, Response } from "express";
import Users from "../models/users.model";
import Roles from "../models/roles.model";
import * as bcrypt from "bcrypt";

interface UserCreationPayload {
  username: string;
  password: string;
  roleId: number;
  isActive?: boolean;
}

class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await Users.findAll({
        include: [
          {
            model: Roles,
            as: "role",
            attributes: ["name"],
          },
        ],
        attributes: { exclude: ["passwordHash", "updatedAt"] },
      });

      return res.status(200).json({
        status: "success",
        data: users,
        metadata: "endpoint users",
      });
    } catch (error) {
      console.error("Error saat mengambil pengguna:", error);

      // Tangani error, kembalikan response 500 (Internal Server Error)
      return res.status(500).json({
        status: "error",
        message: "Gagal mengambil data pengguna.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async postUsers(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, roleId, isActive } =
        req.body as UserCreationPayload;

      if (!username || !password || !roleId || !isActive) {
        return res.status(400).json({
          massage: "Mohon isi username, password, role",
        });
      }

      const cekUserName = await Users.findOne({ where: { username } });

      if (cekUserName) {
        return res.status(409).json({
          message: "Username sudah digunakan. Silakan pilih yang lain.",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = await Users.create({
        username,
        password: passwordHash,
        roleId,
        isActive,
      });

      return res.status(200).json({
        status: "success",
        message: "Pengguna berhasil dibuat.",
        data: {
          id: newUser.id,
          username: newUser.username,
          roleId: newUser.roleId,
          isActive: newUser.isActive,
        },
      });
    } catch (error) {
      console.error("Error saat mengambil pengguna:", error);

      // Tangani error, kembalikan response 500 (Internal Server Error)
      return res.status(500).json({
        status: "error",
        message: "Gagal mengambil data pengguna.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default new UserController();
