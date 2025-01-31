import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newDecision = {
      title: req.body.title,
      description: req.body.description,
      // max_date: req.body.max_date,
      // min_date: req.body.min_date,
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

export default { add };
