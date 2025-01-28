import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const read: RequestHandler = async (req, res, next) => {
  const decisionId = Number.parseInt(req.params.id);
  const decision = await decisionRepository.read(decisionId);
  try {
    if (decision == null) {
      res.sendStatus(404);
    } else {
      res.json(decision);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };
