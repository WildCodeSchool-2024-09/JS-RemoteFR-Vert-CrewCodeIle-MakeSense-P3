import express from "express";
import voteActions from "../modules/vote/voteActions";

const router = express.Router();

router.post(
  "/api/vote",

  voteActions.browse,
  voteActions.read,
  voteActions.edit,
  voteActions.add,
);

export default router;
