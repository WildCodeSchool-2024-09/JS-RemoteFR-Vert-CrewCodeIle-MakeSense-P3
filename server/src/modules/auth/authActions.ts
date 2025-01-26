import type { RequestHandler } from "express";
import { encodeJWT } from "../../services/jwt/jwt.helper";

export const login: RequestHandler = async (req, res) => {
  const user = req.body;

  const token = await encodeJWT(user);

  res
    .status(200)
    .cookie("auth_token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 360000,
    })
    .json({
      message: "Bienvenue sur Intra_Sense !",
    });
};
