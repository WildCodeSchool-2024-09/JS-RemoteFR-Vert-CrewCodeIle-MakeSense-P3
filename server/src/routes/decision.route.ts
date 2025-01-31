import express from "express";
import decisionActions from "../modules/decision/decisionActions";

const router = express.Router();

router.post("/api/decision", decisionActions.add);

router.get("/api/decision/:id", decisionActions.read);

export default router;
