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
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };
    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
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
    // if (user.length === 0) {
    //   next();
    // } else {
    //   res.sendStatus(422);
    // }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, validate };
