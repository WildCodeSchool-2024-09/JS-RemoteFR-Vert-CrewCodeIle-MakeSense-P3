import express from "express";
const router = express.Router();

import CategoryRoute from "./routes/category.route";
import CountryRoute from "./routes/country.route";
import DecisionRoute from "./routes/decision.route";
import RoleRoute from "./routes/role.route";
import UserRoute from "./routes/user.route";
import VoteRoute from "./routes/vote.route";

router.use("/", UserRoute);
router.use("/", CountryRoute);
router.use("/", RoleRoute);
router.use("/", VoteRoute);
router.use("/", CategoryRoute);
router.use("/", DecisionRoute);

export default router;
