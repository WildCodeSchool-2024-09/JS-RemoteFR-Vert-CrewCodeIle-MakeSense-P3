import type { RequestHandler } from "express";
import Joi from "joi";
import userRepository from "./userRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    console.info("req recue pour browse recuperer les utilisateurs)");
    // Fetch all users
    const users = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    console.error("Error dans browse", err);
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  console.info("req recue dans add)", req.body);
  try {
    console.info("données avant  transformation sql:", req.body);
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      avatar: req.body.avatar,
      country_id: Number.parseInt(req.body.country_id),
    };
    console.info("données après  transformation:", user);
    const insertId = await userRepository.create(req.body);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const validateData: RequestHandler = async (req, res, next) => {
  console.info("req recue pour validation des données:", req.body);
  const dataSchema = Joi.object({
    lastname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    firstname: Joi.string()
      .max(50)
      .required()
      .pattern(/^[A-Za-zÀ-ÿ\s-]+$/),
    password: Joi.string()
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
    console.info("Données validées");
    next();
  } else {
    console.error("Erreurs de validation des données:", error.details);
    res.status(400).json({ validationErrors: error.details });
  }
};

const checkEmail: RequestHandler = async (req, res, next) => {
  try {
    console.info(
      "req recue pour vérifier l'unicité de l'email:",
      req.body.email,
    );
    const user = await userRepository.readByEmailWithPassword(req.body.email);

    if (user != null) {
      //object ligne du tableau est elle null ou pas?
      console.error("Email déjà utilisé");
      res.sendStatus(422);
      return;
    }
    console.info("Email non utilisé");
    next();
  } catch (e) {
    console.error("Erreur dans checkEmail", e);
    next(e);
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

export default { add, validateData, checkEmail, read, browse };
