import type { RequestHandler } from "express";
import userDecisionRepository from "./userDecisionRepository";

const browseAnimators: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const users = await userDecisionRepository.readAllAnimators(decisionId);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const browseExperts: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const users = await userDecisionRepository.readAllExperts(decisionId);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const browseImpacted: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const users = await userDecisionRepository.readAllImpacted(decisionId);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export default { browseAnimators, browseExperts, browseImpacted };
