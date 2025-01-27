import express from "express";

const router = express.Router();

import DecisionRoute from "./routes/decision.route";
/* ************************************************************************* */
// Define Your API Routes Here
import UserRoute from "./routes/user.route";

router.use("/", UserRoute);
router.use("/", DecisionRoute);
/* ************************************************************************* */

export default router;
