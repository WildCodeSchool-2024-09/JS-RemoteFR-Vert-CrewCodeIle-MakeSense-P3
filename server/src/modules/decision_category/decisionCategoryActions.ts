import type { RequestHandler } from "express";
import decisionCategoryRepository from "./decisionCategoryRepository";

const browseAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = req.body.id;
    const categories =
      await decisionCategoryRepository.readAllcategory(decisionId);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export default { browseAllCategories };
