import express from "express";
import decisionActions from "../modules/decision/decisionActions";
import decisionCategoryActions from "../modules/decision_category/decisionCategoryActions";
import userDecisionActions from "../modules/user_decision/userDecisionActions";

const router = express.Router();

router.get("/api/decision/:id", decisionActions.read);
router.post(
  "/api/decisionform",
  decisionActions.validateDataDecisionForm,
  decisionActions.addDecision,
  decisionCategoryActions.addDecisionCategory,
  userDecisionActions.addUserDecisionAnimator,
  userDecisionActions.addUserDecisionExpert,
  userDecisionActions.addUserDecisionImpacted,
);

export default router;
