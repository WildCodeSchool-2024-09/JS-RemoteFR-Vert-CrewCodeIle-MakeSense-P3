import express from "express";
import { hashPassword } from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

export default router;
