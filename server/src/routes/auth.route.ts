import express from "express";
import { comparePassword } from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login } from "../modules/auth/authActions";

const router = express.Router();

router.post("/", getUserByEmail, comparePassword, login);

export default router;
