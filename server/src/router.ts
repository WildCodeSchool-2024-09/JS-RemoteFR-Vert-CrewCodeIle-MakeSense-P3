import express from "express";

const router = express.Router();

import AuthRoute from "./routes/auth.route";
import CountryRoute from "./routes/country.route";
import DecisionRoute from "./routes/decision.route";
import UserRoute from "./routes/user.route";

router.use("/", AuthRoute);
router.use("/", CountryRoute);
router.use("/", DecisionRoute);
router.use("/", UserRoute);

export default router;
