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

//Routes pour l'affichage des décisions
router.get("/api/alldecisions", decisionActions.browseAllDecisions);
router.get("/api/archiveddecisions", decisionActions.browseArchivedDecisions);
router.get("/api/mydecisions", decisionActions.browseMyDecisions);
router.get(
  "/api/participatingdecisions",
  decisionActions.browseParticipatingDecisions,
);
router.get("/api/runningdecisions", decisionActions.browseRunningDecisions);

export default router;
