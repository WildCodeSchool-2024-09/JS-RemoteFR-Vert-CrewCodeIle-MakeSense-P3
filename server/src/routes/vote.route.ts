import express from "express";
import voteActions from "../modules/Vote/voteAction";

const router = express.Router();

router.get("/api/vote", voteActions.browse);
router.get("/api/vote/:id", voteActions.read);
router.put("/api/vote/:id", voteActions.edit);
router.post("/api/vote", voteActions.add);

export default router;
