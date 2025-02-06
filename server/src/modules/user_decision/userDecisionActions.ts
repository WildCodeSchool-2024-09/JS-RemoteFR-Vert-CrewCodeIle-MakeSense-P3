import type { RequestHandler } from "express";
import userDecisionRepository from "./userDecisionRepository";

// pour créer tous les animateurs dans la table user_decision
const addUserDecisionAnimator: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.user_animator_id === 0) {
      next();
    } else {
      for (let i = 0; i < req.body.user_animator_id.length; i++) {
        const userDecision = {
          decision_id: Number.parseInt(req.body.decision_id),
          user_id: Number.parseInt(req.body.user_animator_id[i]),
          role: "animator",
        };
        const insertId = await userDecisionRepository.create(userDecision);
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

// pour créer tous les experts dans la table user_decision
const addUserDecisionExpert: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.user_expert_id === 0) {
      next();
    } else {
      for (let i = 0; i < req.body.user_expert_id.length; i++) {
        const userDecision = {
          decision_id: Number.parseInt(req.body.decision_id),
          user_id: Number.parseInt(req.body.user_expert_id[i]),
          role: "expert",
        };
        const insertId = await userDecisionRepository.create(userDecision);
      }
      next();
    }
  } catch (err) {
    next(err);
  }
};

// pour créer tous les impactés dans la table user_decision
const addUserDecisionImpacted: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.user_animator_id === 0) {
      res.status(201).json("envoi ok");
    } else {
      for (let i = 0; i < req.body.user_impacted_id.length; i++) {
        const userDecision = {
          decision_id: Number.parseInt(req.body.decision_id),
          user_id: Number.parseInt(req.body.user_impacted_id[i]),
          role: "impacted",
        };
        const insertId = await userDecisionRepository.create(userDecision);
      }
    }
    res.status(201).json("envoi ok");
  } catch (err) {
    next(err);
  }
};

export default {
  addUserDecisionAnimator,
  addUserDecisionImpacted,
  addUserDecisionExpert,
};
