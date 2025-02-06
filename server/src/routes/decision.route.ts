import express from "express";
import decisionActions from "../modules/decision/decisionActions";

const router = express.Router();

router.get(
  "/api/decision/:id",
  decisionActions.read,
  decisionActions.readCountryAndMaxDate,
); //pour lire country et max date de decision

export default router;
