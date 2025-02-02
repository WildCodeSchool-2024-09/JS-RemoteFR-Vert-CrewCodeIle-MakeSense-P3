import express from "express";
import commentActions from "../modules/comment/commentActions";

const router = express.Router();

router.post("/api/comment", commentActions.add);
router.get("/api/decision/comment/:id", commentActions.readComments);

export default router;
