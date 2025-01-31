import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import UserRoute from "./routes/user.route";

router.use("/", UserRoute);
router.use("/", DecisionRoute);

import CountryRoute from "./routes/country.route";

router.use("/", CountryRoute);

import RoleRoute from "./routes/role.route";

router.use("/", RoleRoute);

import VoteRoute from "./routes/vote.route";

router.use("/", VoteRoute);

import CategoryRoute from "./routes/category.route";

router.use("/", CategoryRoute);

import DecisionRoute from "./routes/decision.route";

router.use("/", DecisionRoute);
/* ************************************************************************* */

export default router;
