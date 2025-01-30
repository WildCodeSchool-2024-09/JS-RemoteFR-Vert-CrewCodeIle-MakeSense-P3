import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import CommentRoute from "./routes/comment.route";
import DecisionRoute from "./routes/decision.route";
import UserRoute from "./routes/user.route";

router.use("/", UserRoute);
router.use("/", DecisionRoute);
router.use("/", CommentRoute);

/* ************************************************************************* */

export default router;
