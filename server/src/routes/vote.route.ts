import express from "express";
import authActions from "../auth/authActions";
import voteActions from "../modules/Vote/voteAction";

const router = express.Router();

router.get("/api/vote", voteActions.browse);
router.get("/api/vote/:id", voteActions.read);
router.get("/api/vote/check/:id", voteActions.checkUserVote);
router.put("/api/vote/:id", authActions.verifyToken, voteActions.edit);
router.post("/api/vote", authActions.verifyToken, voteActions.add);

export default router;
