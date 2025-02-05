import express from "express";
import decisionActions from "../modules/decision/decisionActions";
import decisionCategoryActions from "../modules/decision_category/decisionCategoryActions";

const router = express.Router();

router.get("/api/decision/:id", decisionActions.read);

//Routes pour l'affichage des décisions
router.get("/api/alldecisions", decisionActions.browseAllDecisions);
router.get("/api/archiveddecisions", decisionActions.browseArchivedDecisions);
router.get("/api/mydecisions", decisionActions.browseMyDecisions);
// router.get(
//   "/api/participatingdecisions",
//   decisionActions.,
//   decisionCategoryActions.browseAllCategories,
// );
router.get("/api/runningdecisions", decisionActions.browseRunningDecisions);

export default router;
