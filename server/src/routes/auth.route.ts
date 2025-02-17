import express from "express";
import {
  comparePassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login, logout, verifyToken } from "../modules/auth/authActions";

const router = express.Router();

router.post("/logout", logout);
router.post("/api/auth", getUserByEmail, comparePassword, login);

// router.use(verifyToken);

export default router;
