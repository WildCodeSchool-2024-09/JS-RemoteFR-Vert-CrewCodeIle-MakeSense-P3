import express from "express";
import voteActions from "../modules/Vote/voteAction";
import authActions from "../auth/authActions";
const router = express.Router();

router.get("/api/vote", voteActions.browse);
router.get("/api/vote/:id", voteActions.read);
router.get("/api/vote/check/:id", voteActions.checkUserVote);
//middleware décodant le token--> dans body je vais inserer user_id
router.put("/api/vote/:id", authActions.verifyToken, voteActions.edit);
router.post("/api/vote", authActions.verifyToken, voteActions.add);
//je siuhaite que seul un utilisateur connecté puisse voter ou modifier un vote.

// router.post("/api/vote/:id",    , voteActions.add);
// router.put("/api/vote/:id", , voteActions.edit);
export default router;
