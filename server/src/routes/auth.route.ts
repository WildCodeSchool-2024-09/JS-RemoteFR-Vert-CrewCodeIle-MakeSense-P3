import express from "express";
import { hashPassword } from "../middlewares/auth.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.get("/api/auth", userActions.browse);
router.post(
  "/api/auth",
  userActions.validate,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

export default router;
