import type { RequestHandler } from "express";
import { hashPasswordHelper } from "../services/argon2id.helper";

export const hashPassword: RequestHandler = async (req, res, next) => {
  const { hash_password } = req.body;

  try {
    const newPassword: string = await hashPasswordHelper(hash_password);
    if (newPassword) {
      req.body.hash_password = newPassword;

      next();
    }
  } catch (err) {
    res.status(500);
  }
};
