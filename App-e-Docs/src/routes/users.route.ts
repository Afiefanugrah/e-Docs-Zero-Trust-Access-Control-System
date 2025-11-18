import { Router } from "express";
import UserController from "../controllers/users.controller";

const router = Router();

// Route GET /api/users
router.get("/", UserController.getAllUsers);

router.post("/create", UserController.postUsers);

export default router;
