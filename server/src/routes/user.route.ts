import express from "express";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.get("/api/users", userActions.browse);
router.post("/api/users", userActions.add);

export default router;
