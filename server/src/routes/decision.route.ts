import express from "express";
import decisionActions from "../modules/decision/decisionActions";

const router = express.Router();

router.get("/api/decision/:id", decisionActions.read);

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
