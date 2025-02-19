import express from "express";
import voteActions from "../modules/Vote/voteAction";

const router = express.Router();

router.get("/api/vote", voteActions.browse);
router.get("/api/vote/:id", voteActions.read);
router.get("/api/vote/check/:id", voteActions.checkUserVote);
//middleware décodant le token--> dans body je vais inserer user_id
router.put("/api/vote/:id", voteActions.edit);
router.post("/api/vote", voteActions.add);

// router.post("/api/vote/:id",    , voteActions.add);
// router.put("/api/vote/:id", , voteActions.edit);
export default router;
