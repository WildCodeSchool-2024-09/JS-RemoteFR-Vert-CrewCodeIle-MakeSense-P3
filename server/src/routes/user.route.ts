import express from "express";
import { hashPassword } from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";
import userDecisionActions from "../modules/user_decision/userDecisionActions";

const router = express.Router();

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

// affichage des animateurs, impactés, experts d'une décision
router.get("/api/user/animator/:id", userDecisionActions.browseAnimators);
router.get("/api/user/expert/:id", userDecisionActions.browseExperts);
router.get("/api/user/impacted/:id", userDecisionActions.browseImpacted);

export default router;
