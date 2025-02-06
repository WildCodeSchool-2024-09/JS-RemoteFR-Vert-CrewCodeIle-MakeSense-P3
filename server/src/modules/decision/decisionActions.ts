import type { RequestHandler } from "express";
import decisionRepository from "./decisionRepository";

const browseAllDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readAllDecisions();
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseArchivedDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readArchivedDecisions();
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseMyDecisions: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number.parseInt(req.params.user_id);
    const decision = await decisionRepository.readMyDecisions(user_id);
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseParticipatingDecisions: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number.parseInt(req.params.user_id);
    const decision =
      await decisionRepository.readParticipatingDecisions(user_id);
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseRunningDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readRunningDecisions();
    res.json(decision);
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

export default {
  read,
  browseAllDecisions,
  browseArchivedDecisions,
  browseMyDecisions,
  browseParticipatingDecisions,
  browseRunningDecisions,
};
