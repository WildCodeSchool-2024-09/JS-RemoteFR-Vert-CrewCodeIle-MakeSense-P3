import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const add: RequestHandler = async (req, res, next) => {
  console.info("nouvelle decision ", req.body);
  try {
    const newDecision = {
      title: req.body.title,
      category: req.body.category,
      country: req.body.country,
      description: req.body.description,
      max_date: req.body.max_date.split("T")[0],
      min_date: req.body.min_date.split("T")[0],
      context: req.body.context,
      profit: req.body.profit,
      risk: req.body.risk,
    };
    const insertId = await decisionRepository.create(newDecision);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

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

export default { add, read };
