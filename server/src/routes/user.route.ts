import express from "express";
import {
  hashModifiedPassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

router.get("/api/user", userActions.browse);

router.get("/api/user/:id", userActions.read);

router.put(
  "/api/user/:id",

  userActions.modifiedData,
  hashModifiedPassword,
  userActions.edit,
);

router.delete("/api/user/:id", userActions.destroy);

export default router;
