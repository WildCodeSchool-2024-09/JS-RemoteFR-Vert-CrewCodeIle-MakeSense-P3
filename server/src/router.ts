import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import AuthRoute from "./routes/auth.route";
import DecisionRoute from "./routes/decision.route";
import UserRoute from "./routes/user.route";

router.use("/", UserRoute);
router.use("/", AuthRoute);
router.use("/", DecisionRoute);

/* ************************************************************************* */

export default router;
