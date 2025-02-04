import type { RequestHandler } from "express";
import { string } from "joi";
import {
  hashPasswordHelper,
  verifyPasswordHelper,
} from "../services/argon2id.helper";

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

export const comparePassword: RequestHandler = async (req, res, next) => {
  try {
    const { hash_password, dbpassword } = req.body;

    const isValid = await verifyPasswordHelper(hash_password, dbpassword);
    if (!isValid) {
      req.body.dbpassword = undefined;

      res.status(403).json({
        message: "Le couple email / mot de passe est incorrect.",
      });
      return;
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
};
