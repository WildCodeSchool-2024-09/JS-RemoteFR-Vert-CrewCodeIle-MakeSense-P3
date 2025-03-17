import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const decisionList = await decisionRepository.readAll();

    res.json(decisionList);
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

const readCountryAndMaxDate: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const decision = await decisionRepository.readCountryAndDates(decisionId);

    if (decision == null) {
      res.sendStatus(404);
    } else {
      res.json(decision);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readCountryAndMaxDate };
