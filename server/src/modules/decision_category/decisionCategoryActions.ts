import type { RequestHandler } from "express";
import decisionCategoryRepository from "./decisionCategoryRepository";

const addDecisionCategory: RequestHandler = async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.category_id.length; i++) {
      const decisionCategory = {
        decision_id: Number.parseInt(req.body.decision_id),
        category_id: Number.parseInt(req.body.category_id[i]),
      };
      const insertId =
        await decisionCategoryRepository.create(decisionCategory);
    }
    res.status(201).json("envoi ok");
    next();
  } catch (err) {
    next(err);
  }
};

export default { addDecisionCategory };
