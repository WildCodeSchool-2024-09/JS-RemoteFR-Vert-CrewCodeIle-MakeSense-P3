import type { RequestHandler } from "express";
import decisionCategoryRepository from "./decisionCategoryRepository";

const addDecisionCategory: RequestHandler = async (req, res, next) => {
  try {
    // faire une boucle pour parcourir le tableau category_id

    const decisionCategory = {
      decision_id: Number.parseInt(req.body.decision_id),
      category_id: Number.parseInt(req.body.category_id),
    };

    const insertId = await decisionCategoryRepository.create(decisionCategory);
    res.status(201).json({ id: insertId });
  } catch (err) {
    next(err);
  }
};

export default { addDecisionCategory };
