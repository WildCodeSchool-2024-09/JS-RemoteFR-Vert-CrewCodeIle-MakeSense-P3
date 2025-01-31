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

export default { read };
