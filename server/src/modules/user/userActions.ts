import type { RequestHandler } from "express";
import Joi, { number } from "joi";
import { decodeToken } from "../../services/jwt/jwt.helper";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readAll();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = await userRepository.read(userId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user: UpdatedUserType = {
      id: Number.parseInt(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hash_password: req.body.new_password,
      avatar: req.body.avatar,
    };

    const affectedRows = await userRepository.update(user);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hash_password: req.body.hash_password,
      avatar: req.body.avatar,
      country_id: Number.parseInt(req.body.country_id),
    };

    const insertId = await userRepository.create(req.body);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
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
    country_id: Joi.number().required(),
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const modifiedData: RequestHandler = async (req, res, next) => {
  const dataSchema = Joi.object({
    lastname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    firstname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    new_password: Joi.string()
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

const addUserByTokenEmail: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    const decodedToken = (await decodeToken(token)) as DecodedTokenType;

    if (!decodedToken) {
      res.status(403).json({ message: "Accès refusé" });
      return;
    }

    const user = await userRepository.readByEmailForComment(
      decodedToken?.email,
    );

    if (!user) {
      res.status(404).json({ message: "Utilisateur non reconnu" });
      return;
    }

    req.body.user_id = user.user_id;
    next();
  } catch (err) {
    next(err);
  }
};

const addUserByTokenEmailForComment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const decodedToken = (await decodeToken(
      req.cookies?.auth_token,
    )) as DecodedTokenType;
    if (!decodedToken) {
      res.status(403).json({ message: "Accès refusé" });
      return;
    }
    const user: { user_id: number } | null =
      await userRepository.readByEmailForComment(decodedToken?.email);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non reconnu" });
      return;
    }
    req.body.user_id = user.user_id;
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  edit,
  add,
  validateData,
  modifiedData,
  checkEmail,
  destroy,
  addUserByTokenEmail,
  addUserByTokenEmailForComment,
};
