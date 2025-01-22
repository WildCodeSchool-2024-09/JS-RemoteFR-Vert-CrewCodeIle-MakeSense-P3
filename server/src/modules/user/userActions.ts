import type { RequestHandler } from "express";
import Joi from "joi";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, hash_password, avatar } = req.body;

    const insertId = await userRepository.create(req.body);

    res.status(201).json({ insertId });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const validateData: RequestHandler = async (req, res, next) => {
  const dataSchema = Joi.object({
    lastname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    firstname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    hash_password: Joi.string()
      .max(255)
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      ),
    email: Joi.string().max(155).required(),
    avatar: Joi.string().max(255).required(),
  });

  const { error } = dataSchema.validate(req.body, { abortEarly: false });
  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

const checkEmail: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.checkUniqueEmail(req.body.email);

    if (user.length !== 0) {
      res.sendStatus(422);
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default { add, validateData, checkEmail };
