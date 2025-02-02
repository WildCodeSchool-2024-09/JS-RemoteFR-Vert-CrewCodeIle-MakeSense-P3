import express from "express";
import decisionActions from "../modules/decision/decisionActions";
import decisionCategoryActions from "../modules/decision_category/decisionCategoryActions";

const router = express.Router();

router.get("/api/decision/:id", decisionActions.read);
router.post(
  "/api/decisionform",
  decisionActions.addDecision,
  decisionCategoryActions.addDecisionCategory,
);

// router.post("/api/decisionToto", decisionActions.addToto, categoryActions.add);

export default router;
