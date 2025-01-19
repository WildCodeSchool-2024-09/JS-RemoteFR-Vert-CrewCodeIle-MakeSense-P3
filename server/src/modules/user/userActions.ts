import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const usersFromDB = await userRepository.readAll();
    res.json(usersFromDB);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, avatar } = req.body;

    const insertId = await userRepository.create(req.body);

    res.status(201).json({ insertId });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const userEmail = { email: req.body.email };
  try {
    if (typeof userEmail !== "string") {
      res.sendStatus(422);
      return;
    }
    const user = await userRepository.findEmail(userEmail);
    if (user.length === 0) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, validate };
