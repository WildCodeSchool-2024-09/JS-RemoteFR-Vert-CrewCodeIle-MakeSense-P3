import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const decision = await decisionRepository.read(decisionId);

    if (decision == null) {
      res.sendStatus(404);
    } else {
      res.json(decision);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newDecision = {
      title: req.body.title,
      description: req.body.description,
      max_date: req.body.max_date,
      min_date: req.body.min_date,
      context: req.body.context,
      profit: req.body.profit,
      risk: req.body.risk,
      country_id: Number.parseInt(req.body.country_id),
    };
    const insertId = await decisionRepository.create(newDecision);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Nouvelle action add decision

const addDecision: RequestHandler = async (req, res, next) => {
  const { argument = null } = req.body;

  try {
    const newDecision = {
      title: req.body.title,
      description: req.body.description,
      max_date: req.body.max_date,
      min_date: req.body.min_date,
      context: req.body.context,
      profit: req.body.profit,
      risk: req.body.risk,
      country_id: Number.parseInt(req.body.country_id),
    };
    const insertId = await decisionRepository.create(newDecision);

    if (argument) {
      res.status(201).json({ insertId });
    } else {
      req.body.decision_id = insertId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default { read, add, addDecision };
