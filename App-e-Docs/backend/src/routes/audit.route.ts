import { Router } from "express";
import AuditController from "../controllers/audit.controller";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticateToken, // Memastikan pengguna login
  authorizeRole(["admin"]), // Memastikan peran adalah 'admin'
  AuditController.getAllAuditLogs.bind(AuditController)
);

export default router;
