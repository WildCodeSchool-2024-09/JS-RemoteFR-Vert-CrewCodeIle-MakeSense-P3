import express from "express";
import {
  comparePassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { authWall, login, verifyToken } from "../modules/auth/authActions";

const router = express.Router();

// router.use(verifyToken, authWall);
router.post("/api/auth", getUserByEmail, comparePassword, login);

export default router;
