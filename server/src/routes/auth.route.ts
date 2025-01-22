import express from "express";
import { hashPassword } from "../middlewares/auth.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post(
  "/api/auth",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

export default router;
