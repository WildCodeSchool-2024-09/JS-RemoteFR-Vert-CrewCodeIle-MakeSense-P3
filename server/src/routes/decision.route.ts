import express from "express";
import authActions from "../auth/authActions";
import decisionActions from "../modules/decision/decisionActions";

const router = express.Router();

router.post("/api/decision", authActions.verifyToken, decisionActions.add);
router.get("/api/decision/:id", decisionActions.read);
//afficher toutes les decisions
router.get("/api/decisions", decisionActions.browse);
export default router;
